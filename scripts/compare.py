# python3 scripts/compare.py <ours.png> <outprefix> : writes side-by-side strips (ref | ours) per 900px of reference height
import sys
from PIL import Image
ours = Image.open(sys.argv[1]).convert('RGB')
ref = Image.open('reference/01-full-page.png').convert('RGB')
ref = ref.crop((32, 32, 608, ref.height - 32))
ref = ref.resize((1440, round(ref.height * 1440 / ref.width)), Image.LANCZOS)
print('ref', ref.size, 'ours', ours.size)
step = 900
H = max(ref.height, ours.height)
for i, y in enumerate(range(0, H, step)):
    a = ref.crop((0, y, 1440, min(y + step, ref.height))) if y < ref.height else Image.new('RGB', (1440, step), 'white')
    b = ours.crop((0, y, 1440, min(y + step, ours.height))) if y < ours.height else Image.new('RGB', (1440, step), 'white')
    canvas = Image.new('RGB', (2900, step), 'magenta')
    canvas.paste(a, (0, 0)); canvas.paste(b, (1460, 0))
    canvas = canvas.resize((1450, step // 2), Image.LANCZOS)
    canvas.save(f'{sys.argv[2]}-{i}.png')
print('strips', len(range(0, H, step)))
