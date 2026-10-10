"""List current Remotion compositions using an installed browser when available."""
import os

from render_depth_showcase import PUBLIC_DIR, ROOT, detect_browser, executable, run


def main() -> None:
    npx = executable('npx.cmd' if os.name == 'nt' else 'npx')
    command = [
        npx,
        'remotion',
        'compositions',
        str(ROOT / 'motion/src/index.ts'),
        f'--public-dir={PUBLIC_DIR}',
    ]
    browser = detect_browser(None)
    if browser:
        command += [f'--browser-executable={browser}', '--chrome-mode=chrome-for-testing']
    run(command)


if __name__ == '__main__':
    main()
