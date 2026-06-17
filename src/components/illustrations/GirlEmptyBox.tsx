import { InlineSvg } from "@/components/shared/InlineSvg";

// This illustration relies on CSS variables (--primary / --dark).
// We inline it (no SVGR) so it works with Turbopack.
const svg = `<svg width="236" height="298" viewBox="0 0 236 298" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5"
        d="M203.08 293C203.08 295.42 186.95 297.38 167.08 297.38C147.21 297.38 131.08 295.38 131.08 293C131.08 290.62 147.2 288.63 167.08 288.63C186.96 288.63 203.08 290.62 203.08 293Z"
        fill="#E8EBF2" />
    <path
        d="M68 3.79C68 3.79 62.41 -0.600002 56 1.59C49.59 3.78 44.73 14.46 43 23.14C41.27 31.82 34.62 38.4 36.22 48.58C37.82 58.76 49.39 60.35 63.36 61.85C77.33 63.35 84.91 61.65 91.49 52.47C98.07 43.29 95.28 32.12 91.39 22.24C87.5 12.36 81.02 3.19 75.63 1.49C70.24 -0.210001 68 3.79 68 3.79Z"
        style="stroke:var(--dark); fill:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M44.9 56C45.8433 56.4242 46.8243 56.759 47.83 57" stroke="#E8EBF2"
        stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M66.6 10.9C64.3216 15.9904 61.4338 20.7854 58 25.18C52.28 32.53 39.63 39.47 38.82 47.18C38.6899 48.2122 38.7803 49.2604 39.0854 50.2551C39.3906 51.2497 39.9034 52.1683 40.59 52.95"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M89.81 47.77C89.3966 48.7379 88.866 49.6514 88.23 50.49" stroke="#E8EBF2"
        stroke-linecap="round" stroke-linejoin="round" />
    <path d="M85 28.45C85 28.45 91.43 35.87 90.81 43.79" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M65.38 6.80999C62.8739 6.55491 60.3431 6.90389 57.9996 7.82774C55.6561 8.75158 53.5679 10.2234 51.91 12.12C51.68 12.38 51.47 12.64 51.27 12.9"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M28.49 195.3L27.24 214.54C27.24 214.54 21.92 240.35 20.24 250.99C18.56 261.63 15.48 277.81 14.92 277.81C14.36 277.81 5.18002 283.36 2.24002 287.89C-0.699985 292.42 3.03001 294.34 7.11001 292.89C11.19 291.44 16.73 287.34 18.54 282.47C20.35 277.6 21.25 275.79 21.37 275C21.49 274.21 40.84 222.26 42.76 216.71C44.68 211.16 48.76 194.86 48.76 194.86L58.27 162.6C58.27 162.6 68.45 195.77 68.57 197.24C68.69 198.71 79.09 283.49 79.57 286.66C80.05 289.83 79.91 292.09 81.83 292.77C83.75 293.45 88.28 293.45 90.66 293.45C93.04 293.45 101.3 294.7 105.37 293.68C109.44 292.66 109.9 291.98 107.07 289.94C104.24 287.9 88.52 286.6 87.07 280.66C86.95 280.21 86.84 192.94 86.84 192.94C86.84 192.94 85.48 164.08 83.22 155.94H30.92L28.49 195.3Z"
        fill="#E8EBF2" style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M7.10001 292.87C11.17 291.39 16.72 287.32 18.53 282.45L18.91 281.45C16.6 283.91 12.91 287.33 12.91 287.33C12.6839 286.17 12.1794 285.082 11.44 284.16C11.1174 283.804 10.7041 283.543 10.2444 283.404C9.7847 283.264 9.2958 283.253 8.83001 283.37L12.83 278.97C9.83001 280.83 4.43 284.63 2.31 287.9C-0.719998 292.41 3.00001 294.34 7.10001 292.87Z"
        style="stroke:var(--dark); fill:var(--dark)" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M107 289.92C105.06 288.53 97.09 287.48 91.77 285.05C91.5505 285.237 91.379 285.473 91.27 285.74C90.9323 286.698 90.6682 287.681 90.48 288.68L79.48 286.33V286.64C79.93 289.81 79.82 292.07 81.74 292.75C83.66 293.43 88.19 293.43 90.57 293.43C92.95 293.43 101.21 294.68 105.28 293.66C109.35 292.64 109.87 292 107 289.92Z"
        style="stroke:var(--dark); fill:var(--dark)" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M43.73 109C43.73 109 38.54 111.39 32.26 122.67C25.39 134.98 26.57 141.82 26.47 156.67C26.37 171.52 26.07 196.17 26.07 196.17C26.07 196.17 45.07 201.26 58.7 200.46C72.33 199.66 89.62 196.57 89.62 196.57C89.62 196.57 85.93 146.29 82.44 131.83C78.95 117.37 76.85 110.83 76.85 110.83C70.1048 111.766 63.2699 111.867 56.5 111.13C44.93 110 43.73 109 43.73 109Z"
        style="stroke:var(--dark); fill:var(--dark)" stroke-linecap="round"
        stroke-linejoin="round" />
    <path d="M65.59 153.47C66.11 155.18 66.59 156.91 67.01 158.64" stroke="#E8EBF2"
        stroke-linecap="round" stroke-linejoin="round" />
    <path d="M53.54 125.17C57.5684 132.603 61.0251 140.332 63.8801 148.29" stroke="#E8EBF2"
        stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M171.12 99.44C170.52 99.04 160.69 97.5 160.69 97.5L158.77 96.71C158.77 96.71 170.67 97.66 170.77 97.16C170.87 96.66 171.27 96.06 170.47 95.96C169.67 95.86 154.36 92.75 154.36 92.75C154.36 92.75 158.25 89.07 158.75 88.27C159.25 87.47 159.94 85.87 159.14 85.87C158.34 85.87 158.14 86.37 157.05 87.07C155.96 87.77 151.66 89.47 150.46 90.46C149.26 91.45 145.68 94.05 145.68 94.05L104.1 88.33C104.1 88.33 89.5 70.33 86.33 66.49C84.1264 63.9274 81.6178 61.6438 78.86 59.69C75.8 58.34 75.86 60.6 75.86 60.6L82.25 89C82.25 89 98.78 98.85 99.8 98.85C100.82 98.85 145.48 100.33 145.48 100.33C145.48 100.33 148.48 101.73 150.36 102.92C152.24 104.11 164.23 107.92 164.23 107.92C164.23 107.92 165.03 107.52 164.13 106.82C163.23 106.12 157.45 103.33 157.45 103.33L169.45 105.93C169.45 105.93 170.15 105.43 169.85 104.93C169.55 104.43 158.85 100.34 158.85 100.34L170.85 100.94C170.85 100.94 171.71 99.84 171.12 99.44Z"
        fill="#E8EBF2" style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M101.59 85.24C97.28 79.93 88.67 69.33 86.33 66.49C84.1264 63.9274 81.6178 61.6438 78.86 59.69C75.8 58.34 75.86 60.6 75.86 60.6L82.25 89C82.25 89 89.71 93.44 94.91 96.36L101.59 85.24Z"
        fill="#E8EBF2" style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M57.4 57.26C57.4 57.26 48.72 57.66 43.4 63.55C38.08 69.44 38.71 82.4 40.91 90.18C43.11 97.96 45.91 102.25 45.3 104.95C44.69 107.65 42.51 108.54 43.7 111.03C44.89 113.52 51.78 116.22 63.95 115.82C76.12 115.42 78.42 112.82 78.52 110.54C78.62 108.26 77.72 106.35 78.02 104.95C78.32 103.55 87.1 95.77 87.1 87.19C87.1 78.61 83.31 75.62 82.41 69.43C81.51 63.24 81.81 62.35 78.12 59.65C74.43 56.95 62.29 55.56 57.4 57.26Z"
        fill="#E8EBF2" style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M53.46 87C50.559 89.4276 47.339 91.4464 43.89 93" style="stroke:var(--dark)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path d="M54.42 88C54.42 88 52.27 94.94 47 98.77" style="stroke:var(--dark)"
        stroke-linecap="round"
        stroke-linejoin="round" />
    <path d="M75.96 63.54L76.96 73.12L72.76 68.23L75.96 63.54Z" fill="#E8EBF2"
        style="stroke:var(--dark)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path d="M70.37 73.92L75.96 63.54L70.87 58.06L70.37 73.92Z" fill="#E8EBF2"
        style="stroke:var(--dark)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M59.6 40.3C60.4717 43.7587 60.9051 47.3132 60.89 50.88C60.8609 53.1895 60.6266 55.4919 60.19 57.76L70.37 73.92L73.26 58.92L75.16 48.54C75.16 48.54 63.59 47.88 59.6 40.3Z"
        fill="#E8EBF2" style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M69.77 65.24L70.37 73.92L67.38 69.23L69.77 65.24Z" fill="#E8EBF2"
        style="stroke:var(--dark)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path d="M56.8 57.36L66.08 74.02L69.7701 65.24L59.9 51.67L56.8 57.36Z" fill="#E8EBF2"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M219.38 65.13H135.17V134.23H219.38V65.13Z" style="fill:var(--primary)" />
    <path opacity="0.2" d="M219.38 65.13H135.17V134.23H219.38V65.13Z" fill="black" />
    <path d="M219.38 65.13H135.17V134.23H219.38V65.13Z" style="stroke:var(--dark)"
        stroke-linecap="round"
        stroke-linejoin="round" />
    <path d="M201.55 65.13H117.34V134.23H201.55V65.13Z"
        style="stroke:var(--dark); fill:var(--primary)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path d="M233.25 157.49C230.55 153.21 219.38 134.23 219.38 134.23H201.56L210.73 157.49H233.25Z"
        style="fill:var(--primary)" />
    <path opacity="0.2"
        d="M233.25 157.49C230.55 153.21 219.38 134.23 219.38 134.23H201.56L210.73 157.49H233.25Z"
        fill="black" />
    <path d="M233.25 157.49C230.55 153.21 219.38 134.23 219.38 134.23H201.56L210.73 157.49H233.25Z"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M213.76 157.49C211.06 153.21 199.89 134.23 199.89 134.23H182.07L191.24 157.49H213.76Z"
        style="fill:var(--primary)" />
    <path opacity="0.2"
        d="M213.76 157.49C211.06 153.21 199.89 134.23 199.89 134.23H182.07L191.24 157.49H213.76Z"
        fill="black" />
    <path d="M213.76 157.49C211.06 153.21 199.89 134.23 199.89 134.23H182.07L191.24 157.49H213.76Z"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M40.23 110.83C40.23 110.83 32.75 114.76 32.33 127.68C31.91 140.6 44.32 145.05 44.32 145.05"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M76.85 110.83C76.85 110.83 85.44 112.94 87.92 127.86C90.4 142.78 80.6 146.12 80.6 146.12"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M27.81 145.41C27.81 145.41 11.68 162.85 5.67999 168.79C-0.320013 174.73 4.88999 178.4 7.64999 178.03C10.41 177.66 22.66 163.7 22.66 163.7"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M75.9 146.26C75.9 146.26 102.62 167.4 105.7 169.34C108.78 171.28 115.41 171.5 115.88 169.34C116.35 167.18 110.73 165.56 109 163.62C107.27 161.68 85.31 140.6 85.31 140.6"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M29.61 120.34C29.61 120.34 38.39 112.52 45.25 110.76C52.11 109 73.73 108.57 79.45 110.76C85.17 112.95 88.74 121.79 88.74 121.79"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M43.59 108.26C43.59 108.26 51.59 118.94 67.91 107.36" style="stroke:var(--dark)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M36.89 122.43C36.89 122.43 32.54 133.48 40.89 146.09C49.24 158.7 81.89 159.39 86.53 146.09C91.17 132.79 85.64 118.37 85.64 118.37"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M50.11 106.49C50.11 106.49 56.55 116.72 71.37 106.49" style="stroke:var(--dark)"
        stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M44.29 90C44.29 90 41.54 87.44 42.8 83.24C44.06 79.04 46.87 76.71 50.78 73.92C54.69 71.13 54.61 68.99 54.61 68.99"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M86.37 66.49C86.37 66.49 93.59 74.72 88.88 83.25" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M58.36 78.48C58.36 78.48 62.36 82.48 66.36 78.48C70.36 74.48 66.36 70.48 66.36 70.48"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M60.32 87.24C60.32 87.24 57.51 91.75 62.32 93.64C67.13 95.53 67.13 93.64 67.13 93.64"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M69.32 87.24C69.32 87.24 72.13 91.75 67.32 93.64C62.51 95.53 62.51 93.64 62.51 93.64"
        stroke="#E8EBF2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M62.36 78.48C62.36 78.48 64.36 80.48 66.36 78.48" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M54.37 91.17C54.37 91.17 57.05 92.96 59.74 91.17" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M74.37 91.17C74.37 91.17 77.05 92.96 79.74 91.17" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M48.52 104.44C48.52 104.44 59.71 103.9 66.22 104.44C72.73 104.98 81.09 105.84 81.09 105.84" stroke="#E8EBF2"
        stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M48.52 104.44C48.52 104.44 45.27 105.74 44.75 108.34" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M81.09 105.84C81.09 105.84 84.34 107.14 84.86 109.74" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M70.47 97.05C70.47 97.05 66.36 100.43 60.89 97.05" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M60.89 97.05C60.89 97.05 66.36 99.71 70.47 97.05" stroke="#E8EBF2" stroke-linecap="round"
        stroke-linejoin="round" />
    <path
        d="M89.62 196.57C89.62 196.57 114.26 195.78 129.33 186.56C144.4 177.34 150.85 161.24 150.85 161.24"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M151.06 161.24C151.06 161.24 167.19 142.78 172.68 136.78C178.17 130.78 172.68 128.09 169.94 129.17C167.2 130.25 156.07 149.79 156.07 149.79"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M147.06 131.1C147.06 131.1 150.4 128.29 153.41 129.54C156.42 130.79 157.1 135.05 157.1 135.05"
        style="stroke:var(--dark)" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function GirlEmptyBox({ className, style }: Props) {
  return <InlineSvg svg={svg} className={className} style={style} />;
}
