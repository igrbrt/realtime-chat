import { type SVGProps } from "react";

function SendIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M25.5093 16.23L34.0693 20.51C37.9093 22.43 37.9093 25.57 34.0693 27.49L25.5093 31.77C19.7493 34.65 17.3993 32.29 20.2793 26.54L21.1493 24.81C21.3693 24.37 21.3693 23.64 21.1493 23.2L20.2793 21.46C17.3993 15.71 19.7593 13.35 25.5093 16.23Z"
        stroke="#FF1F6D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.4395 24H26.8395"
        stroke="#FF1F6D"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default SendIcon;
