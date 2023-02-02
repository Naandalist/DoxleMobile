import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

export const SendIcon = (props: any) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.72 10.296a.75.75 0 0 1 .65-.568l14.69-1.554a.75.75 0 0 1 .686 1.187l-8.691 11.946a.75.75 0 0 1-1.355-.396l-.38-6.322-5.285-3.49a.75.75 0 0 1-.315-.803Zm7.103 4.292.249 4.146 6.469-8.89L5.606 11l3.467 2.289 2.846-1.644a.75.75 0 0 1 .75 1.3l-2.846 1.643Z"
        fill="#7B758D"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="rotate(-30 16.794 4.5)"
          d="M0 0h18v18H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
