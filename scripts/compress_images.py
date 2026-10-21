"""Resize heavy portfolio assets to WebP (keep originals on disk)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "img"

# max width per folder use-case
RULES: list[tuple[str, int, int]] = [
    ("*.png", 1280, 82),
    ("events/*.png", 960, 80),
    ("events/*.jpg", 960, 78),
    ("events/*.jpeg", 960, 78),
]


def to_webp(src: Path, max_w: int, quality: int) -> None:
    dst = src.with_suffix(".webp")
    im = Image.open(src)
    im = im.convert("RGB") if im.mode in ("RGBA", "P", "LA") else im
    w, h = im.size
    if w > max_w:
        im = im.resize((max_w, int(h * max_w / w)), Image.Resampling.LANCZOS)
    im.save(dst, "WEBP", quality=quality, method=6)
    print(f"{src.name} -> {dst.name} ({dst.stat().st_size // 1024} KB)")


def main() -> None:
    for pattern, max_w, q in RULES:
        for src in sorted(ROOT.glob(pattern)):
            if src.suffix.lower() == ".webp":
                continue
            to_webp(src, max_w, q)


if __name__ == "__main__":
    main()
