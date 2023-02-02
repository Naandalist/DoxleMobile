import * as React from 'react';
import Svg, {
  Path,
  G,
  Rect,
  Defs,
  ClipPath,
  Pattern,
  Use,
  Image,
  Circle,
} from 'react-native-svg';

export const NoticeCheklistTrashIcon = props => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.98 1.25h-.09c-.534 0-.936 0-1.29.139a2 2 0 0 0-.803.578c-.22.263-.345.599-.49 1.033H1.75a.5.5 0 0 0 0 1h.699l.32 4.791.003.06c.04.59.064.957.146 1.273A3.5 3.5 0 0 0 5.66 12.69c.321.06.689.06 1.28.06h.12c.591 0 .959 0 1.28-.06a3.5 3.5 0 0 0 2.742-2.566c.082-.316.106-.683.146-1.272l.004-.06.32-4.792h.698a.5.5 0 0 0 0-1H9.693c-.145-.434-.27-.77-.49-1.033a2 2 0 0 0-.802-.578c-.355-.14-.757-.14-1.292-.139H6.98ZM9.322 4H10.549l-.315 4.725c-.045.669-.065.935-.12 1.15a2.5 2.5 0 0 1-1.959 1.832c-.217.04-.484.043-1.155.043-.67 0-.938-.002-1.155-.043a2.5 2.5 0 0 1-1.96-1.833c-.054-.214-.074-.48-.119-1.15L3.451 4h5.871Zm-.689-1c-.08-.213-.131-.313-.197-.391a1 1 0 0 0-.401-.29c-.155-.06-.35-.069-1.015-.069h-.04c-.665 0-.86.008-1.015.07a1 1 0 0 0-.401.289c-.066.078-.118.178-.197.391h3.266Zm-2.3 2.833a.5.5 0 1 0-1 0v4.084a.5.5 0 1 0 1 0V5.833Zm1.834-.5a.5.5 0 0 1 .5.5v2.334a.5.5 0 0 1-1 0V5.833a.5.5 0 0 1 .5-.5Z"
      fill="#A593D8"
    />
  </Svg>
);
export const NoticeBoardAddNewIcon = props => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 10a7 7 0 1 1 14 0 7 7 0 0 1-14 0Zm7-8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.5 4.667a.5.5 0 0 0-1 0V9.5H6.667a.5.5 0 0 0 0 1H9.5v2.833a.5.5 0 1 0 1 0V10.5h2.833a.5.5 0 1 0 0-1H10.5V6.667Z"
      fill="#fff"
    />
  </Svg>
);

export const NoticeBoardPDFFileIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 56 56"
    style={{
      enableBackground: 'new 0 0 56 56',
    }}
    xmlSpace="preserve"
    {...props}>
    <Path
      style={{
        fill: '#e9e9e0',
      }}
      d="M36.985 0H7.963C7.155 0 6.5.655 6.5 1.926V55c0 .345.655 1 1.463 1h40.074c.808 0 1.463-.655 1.463-1V12.978c0-.696-.093-.92-.257-1.085L37.607.257A.884.884 0 0 0 36.985 0z"
    />
    <Path
      style={{
        fill: '#d9d7ca',
      }}
      d="M37.5.151V12h11.849z"
    />
    <Path
      style={{
        fill: '#754ee0',
      }}
      d="M19.514 33.324c-.348 0-.682-.113-.967-.326-1.041-.781-1.181-1.65-1.115-2.242.182-1.628 2.195-3.332 5.985-5.068 1.504-3.296 2.935-7.357 3.788-10.75-.998-2.172-1.968-4.99-1.261-6.643.248-.579.557-1.023 1.134-1.215a4.91 4.91 0 0 1 1.016-.172c.504 0 .947.649 1.261 1.049.295.376.964 1.173-.373 6.802 1.348 2.784 3.258 5.62 5.088 7.562 1.311-.237 2.439-.358 3.358-.358 1.566 0 2.515.365 2.902 1.117.32.622.189 1.349-.39 2.16-.557.779-1.325 1.191-2.22 1.191-1.216 0-2.632-.768-4.211-2.285-2.837.593-6.15 1.651-8.828 2.822-.836 1.774-1.637 3.203-2.383 4.251-1.025 1.435-1.909 2.105-2.784 2.105zm2.662-5.126c-2.137 1.201-3.008 2.188-3.071 2.744-.01.092-.037.334.431.692.149-.047 1.019-.444 2.64-3.436zm13.637-4.442c.815.627 1.014.944 1.547.944.234 0 .901-.01 1.21-.441.149-.209.207-.343.23-.415-.123-.065-.286-.197-1.175-.197-.505.001-1.14.023-1.812.109zm-7.47-6.582a71.291 71.291 0 0 1-2.674 7.564 49.966 49.966 0 0 1 6.496-2.02c-1.35-1.568-2.699-3.526-3.822-5.544zm-.607-8.462c-.098.033-1.33 1.757.096 3.216.949-2.115-.053-3.23-.096-3.216zM48.037 56H7.963A1.463 1.463 0 0 1 6.5 54.537V39h43v15.537c0 .808-.655 1.463-1.463 1.463z"
    />
    <Path
      style={{
        fill: '#fff',
      }}
      d="M17.385 53h-1.641V42.924h2.898c.428 0 .852.068 1.271.205.419.137.795.342 1.128.615.333.273.602.604.807.991s.308.822.308 1.306c0 .511-.087.973-.26 1.388a2.9 2.9 0 0 1-.725 1.046c-.31.282-.684.501-1.121.656s-.921.232-1.449.232h-1.217V53zm0-8.832v3.992h1.504c.2 0 .398-.034.595-.103.196-.068.376-.18.54-.335.164-.155.296-.371.396-.649.1-.278.15-.622.15-1.032 0-.164-.023-.354-.068-.567a1.637 1.637 0 0 0-.28-.615 1.657 1.657 0 0 0-.595-.492c-.255-.132-.593-.198-1.012-.198h-1.23zM32.219 47.682c0 .829-.089 1.538-.267 2.126s-.403 1.08-.677 1.477-.581.709-.923.937-.672.398-.991.513a4.094 4.094 0 0 1-.875.219c-.264.03-.46.046-.588.046h-3.814V42.924h3.035c.848 0 1.593.135 2.235.403s1.176.627 1.6 1.073.74.955.95 1.524c.21.57.315 1.156.315 1.758zm-4.867 4.115c1.112 0 1.914-.355 2.406-1.066s.738-1.741.738-3.09c0-.419-.05-.834-.15-1.244-.101-.41-.294-.781-.581-1.114s-.677-.602-1.169-.807-1.13-.308-1.914-.308h-.957v7.629h1.627zM36.266 44.168v3.172h4.211v1.121h-4.211V53h-1.668V42.924H40.9v1.244h-4.634z"
    />
  </Svg>
);

export const NoticeBoardDocFileIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      enableBackground: 'new 0 0 128 128',
    }}
    viewBox="0 0 128 128"
    xmlSpace="preserve"
    {...props}>
    <Path
      d="M104 126H24c-5.5 0-10-4.5-10-10V12c0-5.5 4.5-10 10-10h40.7c2.7 0 5.2 1 7.1 2.9l39.3 39.3c1.9 1.9 2.9 4.4 2.9 7.1V116c0 5.5-4.5 10-10 10zM24 6c-3.3 0-6 2.7-6 6v104c0 3.3 2.7 6 6 6h80c3.3 0 6-2.7 6-6V51.3c0-1.6-.6-3.1-1.8-4.2L68.9 7.8C67.8 6.6 66.3 6 64.7 6H24z"
      style={{
        fill: '#754ee0',
      }}
    />
    <Path
      d="M78.7 96h-8.3l-4.6-18c-.2-.6-.5-2-.9-4s-.7-3.4-.7-4c-.1.8-.3 2.2-.7 4.1s-.7 3.2-.9 4L58 96h-8.3L41 61.7h7.1l4.4 18.7c.8 3.5 1.3 6.4 1.7 9 .1-.9.3-2.3.6-4.1s.7-3.3.9-4.3l5-19.2h6.9l5 19.2c.2.9.5 2.2.8 3.9s.6 3.3.8 4.5c.2-1.2.4-2.7.8-4.6s.7-3.3.9-4.4l4.4-18.7h7.1L78.7 96z"
      style={{
        fill: '#754ee0',
      }}
    />
  </Svg>
);

export const NoticeBoardAttachmentIcon = props => (
  <Svg
    width={14}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.13 1.889a3.24 3.24 0 0 0-3.24 3.24v9.672a5.11 5.11 0 1 0 10.22 0V4.242a.5.5 0 0 1 1 0v10.559a6.11 6.11 0 1 1-12.22 0V5.129a4.24 4.24 0 0 1 8.48 0v9.607a2.37 2.37 0 0 1-4.74 0V5.194a.5.5 0 1 1 1 0v9.543a1.37 1.37 0 0 0 2.74 0V5.13a3.24 3.24 0 0 0-3.24-3.24Z"
      fill="#000"
    />
  </Svg>
);
export const NoticeBoardEditCategoryIcon = props => (
  <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.282 3.01a.753.753 0 0 0-1.065 0l-.152.152a1.13 1.13 0 0 0 1.065 1.064l.152-.152a.753.753 0 0 0 0-1.064Zm-1.339 2.403a2.655 2.655 0 0 1-1.064-1.065L7.45 7.777c-.483.483-.665.668-.81.871a3.25 3.25 0 0 0-.346.61c-.094.218-.158.455-.305 1.045.59-.148.826-.212 1.044-.305a3.25 3.25 0 0 0 .61-.346c.203-.146.388-.328.871-.81l3.429-3.43Zm-.786-3.464a2.253 2.253 0 1 1 3.185 3.185L9.575 9.902l-.044.044c-.425.425-.698.698-1.012.924-.278.2-.577.37-.892.505-.355.153-.73.247-1.313.392l-.06.016-1.114.278a.75.75 0 0 1-.91-.91l.279-1.113.015-.06c.145-.583.24-.959.392-1.314a4.75 4.75 0 0 1 .505-.892c.226-.314.5-.587.924-1.012l.044-.044 4.768-4.767ZM2.083 14.875a.75.75 0 0 1 .75-.75h11.333a.75.75 0 1 1 0 1.5H2.833a.75.75 0 0 1-.75-.75Z"
      fill="#000"
    />
  </Svg>
);
export const NoticeBoardPlusCircleIcon = props => (
  <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.875 8.5a5.625 5.625 0 1 1 11.25 0 5.625 5.625 0 0 1-11.25 0ZM8.5 1.375a7.125 7.125 0 1 0 0 14.25 7.125 7.125 0 0 0 0-14.25Zm.75 4.292a.75.75 0 1 0-1.5 0V7.75H5.667a.75.75 0 1 0 0 1.5H7.75v2.083a.75.75 0 0 0 1.5 0V9.25h2.083a.75.75 0 0 0 0-1.5H9.25V5.667Z"
      fill="#000"
    />
  </Svg>
);

export const NoticeBoardSettingIcon = props => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 1a2 2 0 0 0-2 2v.608c-.135.05-.268.105-.399.165l-.43-.43a2 2 0 1 0-2.828 2.829l.43.43c-.06.13-.115.263-.165.398H3a2 2 0 1 0 0 4h.608c.05.135.105.268.165.399l-.43.43a2 2 0 0 0 2.829 2.828l.43-.43c.13.06.263.115.398.165V15a2 2 0 1 0 4 0v-.607a5.74 5.74 0 0 0 .399-.166l.43.43a2 2 0 0 0 2.828-2.829l-.43-.43c.06-.13.115-.263.165-.398H15a2 2 0 1 0 0-4h-.607a5.7 5.7 0 0 0-.166-.399l.43-.43a2 2 0 0 0-2.829-2.828l-.43.43A5.702 5.702 0 0 0 11 3.608V3a2 2 0 0 0-2-2ZM8 3a1 1 0 0 1 2 0v.967a.5.5 0 0 0 .357.48c.316.094.618.22.902.374a.5.5 0 0 0 .592-.086l.684-.685a1 1 0 1 1 1.415 1.414l-.685.685a.5.5 0 0 0-.086.592c.155.284.28.586.374.902a.5.5 0 0 0 .48.357H15a1 1 0 1 1 0 2h-.967a.5.5 0 0 0-.48.357c-.094.316-.22.618-.374.902a.5.5 0 0 0 .086.592l.685.684a1 1 0 1 1-1.414 1.415l-.685-.685a.5.5 0 0 0-.592-.086c-.284.155-.586.28-.902.374a.5.5 0 0 0-.357.48V15a1 1 0 1 1-2 0v-.967a.5.5 0 0 0-.357-.48 4.727 4.727 0 0 1-.902-.374.5.5 0 0 0-.592.086l-.685.685a1 1 0 0 1-1.414 0l-.353.353.353-.353a1 1 0 0 1 0-1.414l.685-.685a.5.5 0 0 0 .086-.592 4.717 4.717 0 0 1-.374-.902.5.5 0 0 0-.48-.357H3a1 1 0 1 1 0-2h.967a.5.5 0 0 0 .48-.357c.094-.316.22-.618.374-.902a.5.5 0 0 0-.086-.592l-.685-.685A1 1 0 0 1 5.464 4.05l.685.685a.5.5 0 0 0 .592.086c.284-.155.586-.28.902-.374A.5.5 0 0 0 8 3.967V3Zm-.75 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0ZM9 6.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Z"
      fill="rgb(133, 92, 248)"
    />
  </Svg>
);

export const NoticeBoardFilterIcon = props => (
  <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.125 11.391a.65.65 0 1 0 0 1.3h2.26a2.776 2.776 0 1 0 0-1.3h-2.26Zm4.958 2.125a1.475 1.475 0 1 1 0-2.95 1.475 1.475 0 0 1 0 2.95Zm4.25-2.125a.65.65 0 0 0 0 1.3h3.542a.65.65 0 1 0 0-1.3h-3.542ZM2.125 4.308a.65.65 0 0 0 0 1.3h3.541a.65.65 0 0 0 0-1.3H2.125Zm10.49 1.3a2.776 2.776 0 1 1 0-1.3h2.26a.65.65 0 1 1 0 1.3h-2.26Zm-2.699.825a1.475 1.475 0 1 1 0-2.95 1.475 1.475 0 0 1 0 2.95Z"
      fill="rgb(133, 92, 248)"
    />
  </Svg>
);
export const MenuIcon = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.25 7A.75.75 0 0 1 4 6.25h10a.75.75 0 0 1 0 1.5H4A.75.75 0 0 1 3.25 7Zm0 5a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75ZM4 16.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5H4Z"
      fill="#22282F"
    />
  </Svg>
);

export const SettingIcon = props => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 1a2 2 0 0 0-2 2v.608c-.135.05-.268.105-.399.165l-.43-.43a2 2 0 1 0-2.828 2.829l.43.43c-.06.13-.115.263-.165.398H3a2 2 0 1 0 0 4h.608c.05.135.105.268.165.399l-.43.43a2 2 0 0 0 2.829 2.828l.43-.43c.13.06.263.115.398.165V15a2 2 0 1 0 4 0v-.607a5.74 5.74 0 0 0 .399-.166l.43.43a2 2 0 0 0 2.828-2.829l-.43-.43c.06-.13.115-.263.165-.398H15a2 2 0 1 0 0-4h-.607a5.7 5.7 0 0 0-.166-.399l.43-.43a2 2 0 0 0-2.829-2.828l-.43.43A5.702 5.702 0 0 0 11 3.608V3a2 2 0 0 0-2-2ZM8 3a1 1 0 0 1 2 0v.967a.5.5 0 0 0 .357.48c.316.094.618.22.902.374a.5.5 0 0 0 .592-.086l.684-.685a1 1 0 1 1 1.415 1.414l-.685.685a.5.5 0 0 0-.086.592c.155.284.28.586.374.902a.5.5 0 0 0 .48.357H15a1 1 0 1 1 0 2h-.967a.5.5 0 0 0-.48.357c-.094.316-.22.618-.374.902a.5.5 0 0 0 .086.592l.685.684a1 1 0 1 1-1.414 1.415l-.685-.685a.5.5 0 0 0-.592-.086c-.284.155-.586.28-.902.374a.5.5 0 0 0-.357.48V15a1 1 0 1 1-2 0v-.967a.5.5 0 0 0-.357-.48 4.727 4.727 0 0 1-.902-.374.5.5 0 0 0-.592.086l-.685.685a1 1 0 0 1-1.414 0l-.353.353.353-.353a1 1 0 0 1 0-1.414l.685-.685a.5.5 0 0 0 .086-.592 4.717 4.717 0 0 1-.374-.902.5.5 0 0 0-.48-.357H3a1 1 0 1 1 0-2h.967a.5.5 0 0 0 .48-.357c.094-.316.22-.618.374-.902a.5.5 0 0 0-.086-.592l-.685-.685A1 1 0 0 1 5.464 4.05l.685.685a.5.5 0 0 0 .592.086c.284-.155.586-.28.902-.374A.5.5 0 0 0 8 3.967V3Zm-.75 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0ZM9 6.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Z"
      fill="#000"
    />
  </Svg>
);

export const ProjectFilterIcon = props => (
  <Svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.125 11.391a.65.65 0 1 0 0 1.3h2.26a2.776 2.776 0 1 0 0-1.3h-2.26Zm4.958 2.125a1.475 1.475 0 1 1 0-2.95 1.475 1.475 0 0 1 0 2.95Zm4.25-2.125a.65.65 0 0 0 0 1.3h3.542a.65.65 0 1 0 0-1.3h-3.542ZM2.125 4.308a.65.65 0 0 0 0 1.3h3.541a.65.65 0 0 0 0-1.3H2.125Zm10.49 1.3a2.776 2.776 0 1 1 0-1.3h2.26a.65.65 0 1 1 0 1.3h-2.26Zm-2.699.825a1.475 1.475 0 1 1 0-2.95 1.475 1.475 0 0 1 0 2.95Z"
      fill="#000"
    />
  </Svg>
);

export const ProjectExpandIcon = props => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect width={14} height={14} rx={6} fill="#9974FE" />
    <Path
      d="m3 5 4 4 4-4"
      stroke="#F5F1FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const FilterCloseIcon = props => (
  <Svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.22 4.22a.75.75 0 0 1 1.06 0L9.5 8.44l4.22-4.22a.75.75 0 1 1 1.06 1.06L10.56 9.5l4.22 4.22a.75.75 0 1 1-1.06 1.06L9.5 10.56l-4.22 4.22a.75.75 0 0 1-1.06-1.06L8.44 9.5 4.22 5.28a.75.75 0 0 1 0-1.06Z"
      fill="#ADA7C0"
    />
  </Svg>
);

export const FilterAssigneeIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.08301 4.66667C6.08301 3.60812 6.94113 2.75 7.99967 2.75C9.05822 2.75 9.91634 3.60812 9.91634 4.66667C9.91634 5.72521 9.05822 6.58333 7.99967 6.58333C6.94113 6.58333 6.08301 5.72521 6.08301 4.66667ZM7.99967 1.25C6.1127 1.25 4.58301 2.77969 4.58301 4.66667C4.58301 6.55364 6.1127 8.08333 7.99967 8.08333C9.88665 8.08333 11.4163 6.55364 11.4163 4.66667C11.4163 2.77969 9.88665 1.25 7.99967 1.25ZM4.08301 12.6667C4.08301 11.6081 4.94113 10.75 5.99967 10.75H9.99968C11.0582 10.75 11.9163 11.6081 11.9163 12.6667C11.9163 12.9888 11.6552 13.25 11.333 13.25H4.66634C4.34418 13.25 4.08301 12.9888 4.08301 12.6667ZM5.99967 9.25C4.1127 9.25 2.58301 10.7797 2.58301 12.6667C2.58301 13.8173 3.51575 14.75 4.66634 14.75H11.333C12.4836 14.75 13.4163 13.8173 13.4163 12.6667C13.4163 10.7797 11.8866 9.25 9.99968 9.25H5.99967Z"
      fill="#22282F"
    />
  </Svg>
);

export const FilterBudgetIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.138 2.786C9.61 2.75 8.942 2.75 8 2.75H5.765A3.015 3.015 0 0 0 2.75 5.765V8c0 .942 0 1.611.036 2.138.036.52.103.845.211 1.106a3.25 3.25 0 0 0 1.76 1.759c.26.108.586.175 1.105.21.527.037 1.196.037 2.138.037s1.611 0 2.138-.036c.52-.036.845-.103 1.106-.211a3.25 3.25 0 0 0 1.759-1.76c.108-.26.175-.586.21-1.105.037-.527.037-1.196.037-2.138s0-1.611-.036-2.138c-.036-.52-.103-.845-.211-1.106a3.25 3.25 0 0 0-1.76-1.759c-.26-.108-.586-.175-1.105-.21Zm.102-1.496c.596.04 1.104.125 1.578.322a4.75 4.75 0 0 1 2.57 2.57c.197.474.281.982.322 1.578.04.584.04 1.304.04 2.213v.054c0 .91 0 1.63-.04 2.213-.04.596-.125 1.104-.322 1.578a4.75 4.75 0 0 1-2.57 2.57c-.474.197-.982.281-1.578.322-.584.04-1.304.04-2.213.04h-.054c-.91 0-1.63 0-2.213-.04-.596-.04-1.104-.125-1.578-.322a4.75 4.75 0 0 1-2.57-2.57c-.197-.474-.282-.982-.322-1.578-.04-.584-.04-1.304-.04-2.213V5.765A4.515 4.515 0 0 1 5.765 1.25h2.262c.91 0 1.63 0 2.213.04Z"
      fill="#22282F"
    />
    <Path
      d="M8.09 12.91V3.817h.582v9.091H8.09Zm1.544-6.091a.899.899 0 0 0-.365-.668c-.216-.158-.508-.238-.878-.238-.25 0-.462.036-.635.107a.895.895 0 0 0-.398.288.692.692 0 0 0-.135.419.598.598 0 0 0 .082.34.852.852 0 0 0 .252.253c.106.068.23.129.37.18.139.05.288.093.447.129l.653.156c.317.07.609.166.874.284.265.118.495.264.689.437.194.172.344.376.45.61.11.235.165.504.168.807-.003.445-.117.83-.341 1.157-.223.325-.545.577-.966.757-.42.177-.925.266-1.517.266-.587 0-1.098-.09-1.534-.27a2.247 2.247 0 0 1-1.015-.799c-.242-.355-.368-.794-.38-1.317h1.488c.016.243.086.447.21.61.125.161.292.283.5.366.21.08.448.12.714.12.26 0 .486-.037.678-.113a1.04 1.04 0 0 0 .45-.316.73.73 0 0 0 .16-.465c0-.163-.048-.3-.145-.412a1.104 1.104 0 0 0-.419-.284 4.262 4.262 0 0 0-.671-.213l-.792-.199c-.613-.15-1.097-.382-1.452-.7-.356-.317-.532-.744-.53-1.281-.002-.44.115-.825.352-1.155.24-.329.567-.586.984-.77.416-.185.89-.277 1.42-.277.54 0 1.011.092 1.413.277.405.184.72.441.945.77.225.33.341.71.348 1.144H9.634Z"
      fill="#000"
    />
  </Svg>
);

export const FilterOrderIcon = props => (
  <Svg
    width={13}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.568.65a.65.65 0 0 0-1.3 0v.517c-.257.004-.488.01-.693.028-.38.03-.736.098-1.073.27A2.75 2.75 0 0 0 .3 2.666C.128 3.004.06 3.36.03 3.74 0 4.104 0 4.55 0 5.084V10.15c0 .534 0 .98.03 1.344.03.38.098.737.27 1.074a2.75 2.75 0 0 0 1.202 1.202c.337.172.693.239 1.073.27.365.03.81.03 1.345.03h5.065c.535 0 .98 0 1.345-.03.38-.031.736-.098 1.073-.27a2.749 2.749 0 0 0 1.202-1.202c.172-.337.24-.694.27-1.074.03-.364.03-.81.03-1.344V5.085c0-.535 0-.98-.03-1.345-.03-.38-.098-.736-.27-1.074a2.75 2.75 0 0 0-1.202-1.201c-.337-.172-.694-.24-1.073-.27a10.249 10.249 0 0 0-.693-.028V.65a.65.65 0 1 0-1.3 0v.515H4.568V.65ZM8.987 3.2a.65.65 0 0 1-.64-.535H4.558a.65.65 0 0 1-1.28.002c-.23.003-.419.01-.58.023-.288.023-.425.065-.515.111a1.25 1.25 0 0 0-.547.546c-.046.09-.088.228-.111.515-.024.296-.025.68-.025 1.253v5.005c0 .572 0 .956.025 1.252.023.287.065.425.111.515.12.236.311.427.547.546.09.047.227.089.514.112.296.024.68.025 1.253.025h5.005c.572 0 .957 0 1.252-.025.288-.023.425-.065.515-.111a1.25 1.25 0 0 0 .547-.547c.046-.09.088-.228.111-.515.024-.296.025-.68.025-1.252V5.115c0-.573 0-.957-.025-1.253-.023-.287-.065-.424-.111-.515a1.25 1.25 0 0 0-.547-.546c-.09-.046-.227-.088-.514-.111a8.615 8.615 0 0 0-.581-.023.65.65 0 0 1-.64.534ZM3.284 4.435a.65.65 0 0 0 0 1.3h6.337a.65.65 0 0 0 0-1.3H3.284Zm-.65 3.184a.65.65 0 0 1 .65-.65h3.802a.65.65 0 1 1 0 1.3H3.284a.65.65 0 0 1-.65-.65Zm.65 1.885a.65.65 0 0 0 0 1.3h1.901a.65.65 0 1 0 0-1.3h-1.9Z"
      fill="#0C0B0C"
    />
  </Svg>
);

export const FilterStartDateIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333-.083a.75.75 0 0 1 .75.75v.583h1.944c.748 0 1.368 0 1.89.023V.667a.75.75 0 0 1 1.5 0v.806c.137.04.27.085.4.139a4.75 4.75 0 0 1 2.571 2.57c.197.475.281.983.322 1.579.04.583.04 1.303.04 2.212v.055c0 .908 0 1.629-.04 2.212-.04.596-.125 1.104-.322 1.578a4.75 4.75 0 0 1-2.57 2.57c-.474.197-.982.282-1.578.322-.584.04-1.304.04-2.213.04h-.054c-.91 0-1.63 0-2.213-.04-.596-.04-1.104-.125-1.578-.321a4.75 4.75 0 0 1-2.57-2.57c-.197-.475-.282-.983-.322-1.579-.04-.583-.04-1.304-.04-2.212V6.2c0-.186 0-.304.005-.408a4.752 4.752 0 0 1 3.328-4.327V.667a.75.75 0 0 1 .75-.75Zm4.591 2.857a.75.75 0 0 0 1.398.257 3.25 3.25 0 0 1 1.68 1.726c.109.26.176.586.212 1.106.036.526.036 1.195.036 2.137s0 1.612-.036 2.138c-.036.52-.103.845-.211 1.106a3.25 3.25 0 0 1-1.76 1.759c-.26.108-.586.175-1.105.211-.527.036-1.196.036-2.138.036s-1.611 0-2.138-.036c-.52-.036-.845-.103-1.106-.211a3.25 3.25 0 0 1-1.759-1.759c-.108-.26-.175-.586-.21-1.106C2.75 9.612 2.75 8.942 2.75 8V6.223c0-.215 0-.298.003-.364A3.25 3.25 0 0 1 4.677 3.03a.75.75 0 0 0 1.402-.28H8c.82 0 1.432 0 1.924.023Z"
        fill="#22282F"
      />
      <Path
        d="M9.634 6.819a.899.899 0 0 0-.365-.668c-.216-.158-.508-.238-.878-.238-.25 0-.462.036-.635.107a.895.895 0 0 0-.398.288.692.692 0 0 0-.135.419.598.598 0 0 0 .082.34.852.852 0 0 0 .252.253c.106.068.23.129.37.18.139.05.288.093.447.129l.653.156c.317.07.609.166.874.284.265.118.495.264.689.437.194.172.344.376.45.61.11.235.165.504.168.807-.003.445-.117.83-.341 1.157-.223.325-.545.577-.966.757-.42.177-.925.266-1.517.266-.587 0-1.098-.09-1.534-.27a2.247 2.247 0 0 1-1.015-.799c-.242-.355-.368-.794-.38-1.317h1.488c.016.243.086.447.21.61.125.161.292.283.5.366.21.08.448.12.714.12.26 0 .486-.037.678-.113a1.04 1.04 0 0 0 .45-.316.73.73 0 0 0 .16-.465c0-.163-.048-.3-.145-.412a1.104 1.104 0 0 0-.419-.284 4.262 4.262 0 0 0-.671-.213l-.792-.199c-.613-.15-1.097-.382-1.452-.7-.356-.317-.532-.744-.53-1.281-.002-.44.115-.825.352-1.155.24-.329.567-.586.984-.77.416-.185.89-.277 1.42-.277.54 0 1.011.092 1.413.277.405.184.72.441.945.77.225.33.341.71.348 1.144H9.634Z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const FilterEndDateIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333-.083a.75.75 0 0 1 .75.75v.583h1.944c.748 0 1.368 0 1.89.023V.667a.75.75 0 0 1 1.5 0v.806c.137.04.27.085.4.139a4.75 4.75 0 0 1 2.571 2.57c.197.475.281.983.322 1.579.04.583.04 1.303.04 2.212v.055c0 .908 0 1.629-.04 2.212-.04.596-.125 1.104-.322 1.578a4.75 4.75 0 0 1-2.57 2.57c-.474.197-.982.282-1.578.322-.584.04-1.304.04-2.213.04h-.054c-.91 0-1.63 0-2.213-.04-.596-.04-1.104-.125-1.578-.321a4.75 4.75 0 0 1-2.57-2.57c-.197-.475-.282-.983-.322-1.579-.04-.583-.04-1.304-.04-2.212V6.2c0-.186 0-.304.005-.408a4.752 4.752 0 0 1 3.328-4.327V.667a.75.75 0 0 1 .75-.75Zm4.591 2.857a.75.75 0 0 0 1.398.257 3.25 3.25 0 0 1 1.68 1.726c.109.26.176.586.212 1.106.036.526.036 1.195.036 2.137s0 1.612-.036 2.138c-.036.52-.103.845-.211 1.106a3.25 3.25 0 0 1-1.76 1.759c-.26.108-.586.175-1.105.211-.527.036-1.196.036-2.138.036s-1.611 0-2.138-.036c-.52-.036-.845-.103-1.106-.211a3.25 3.25 0 0 1-1.759-1.759c-.108-.26-.175-.586-.21-1.106C2.75 9.612 2.75 8.942 2.75 8V6.223c0-.215 0-.298.003-.364A3.25 3.25 0 0 1 4.677 3.03a.75.75 0 0 0 1.402-.28H8c.82 0 1.432 0 1.924.023Z"
        fill="#22282F"
      />
      <Path
        d="M9.634 6.819a.899.899 0 0 0-.365-.668c-.216-.158-.508-.238-.878-.238-.25 0-.462.036-.635.107a.895.895 0 0 0-.398.288.692.692 0 0 0-.135.419.598.598 0 0 0 .082.34.852.852 0 0 0 .252.253c.106.068.23.129.37.18.139.05.288.093.447.129l.653.156c.317.07.609.166.874.284.265.118.495.264.689.437.194.172.344.376.45.61.11.235.165.504.168.807-.003.445-.117.83-.341 1.157-.223.325-.545.577-.966.757-.42.177-.925.266-1.517.266-.587 0-1.098-.09-1.534-.27a2.247 2.247 0 0 1-1.015-.799c-.242-.355-.368-.794-.38-1.317h1.488c.016.243.086.447.21.61.125.161.292.283.5.366.21.08.448.12.714.12.26 0 .486-.037.678-.113a1.04 1.04 0 0 0 .45-.316.73.73 0 0 0 .16-.465c0-.163-.048-.3-.145-.412a1.104 1.104 0 0 0-.419-.284 4.262 4.262 0 0 0-.671-.213l-.792-.199c-.613-.15-1.097-.382-1.452-.7-.356-.317-.532-.744-.53-1.281-.002-.44.115-.825.352-1.155.24-.329.567-.586.984-.77.416-.185.89-.277 1.42-.277.54 0 1.011.092 1.413.277.405.184.72.441.945.77.225.33.341.71.348 1.144H9.634Z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const FilterWeekDueIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333-.083a.75.75 0 0 1 .75.75v.583h1.944c.748 0 1.368 0 1.89.023V.667a.75.75 0 0 1 1.5 0v.806c.137.04.27.085.4.139a4.75 4.75 0 0 1 2.571 2.57c.197.475.281.983.322 1.579.04.583.04 1.303.04 2.212v.055c0 .908 0 1.629-.04 2.212-.04.596-.125 1.104-.322 1.578a4.75 4.75 0 0 1-2.57 2.57c-.474.197-.982.282-1.578.322-.584.04-1.304.04-2.213.04h-.054c-.91 0-1.63 0-2.213-.04-.596-.04-1.104-.125-1.578-.321a4.75 4.75 0 0 1-2.57-2.57c-.197-.475-.282-.983-.322-1.579-.04-.583-.04-1.304-.04-2.212V5.765a4.517 4.517 0 0 1 3.333-4.359V.667a.75.75 0 0 1 .75-.75Zm4.591 2.857a.75.75 0 0 0 1.398.257 3.25 3.25 0 0 1 1.68 1.726c.109.26.176.586.212 1.106.036.526.036 1.195.036 2.137s0 1.612-.036 2.138c-.036.52-.103.845-.211 1.106a3.25 3.25 0 0 1-1.76 1.759c-.26.108-.586.175-1.105.211-.527.036-1.196.036-2.138.036s-1.611 0-2.138-.036c-.52-.036-.845-.103-1.106-.211a3.25 3.25 0 0 1-1.759-1.759c-.108-.26-.175-.586-.21-1.106C2.75 9.612 2.75 8.942 2.75 8V5.765c0-1.27.784-2.355 1.895-2.8a.75.75 0 0 0 1.434-.215H8c.82 0 1.432 0 1.924.024Zm-1.006 3.26L5.904 12H7.49l3.018-5.998V4.728H5.406v1.257h3.512v.05Z"
        fill="#22282F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const FilterFortnightDueIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333-.083a.75.75 0 0 1 .75.75v.583h1.944c.748 0 1.368 0 1.89.023V.667a.75.75 0 0 1 1.5 0v.806c.137.04.27.085.4.139a4.75 4.75 0 0 1 2.571 2.57c.197.475.281.983.322 1.579.04.583.04 1.303.04 2.212v.055c0 .908 0 1.629-.04 2.212-.04.596-.125 1.104-.322 1.578a4.75 4.75 0 0 1-2.57 2.57c-.474.197-.982.282-1.578.322-.584.04-1.304.04-2.213.04h-.054c-.91 0-1.63 0-2.213-.04-.596-.04-1.104-.125-1.578-.321a4.75 4.75 0 0 1-2.57-2.57c-.197-.475-.282-.983-.322-1.579-.04-.583-.04-1.304-.04-2.212V5.765a4.517 4.517 0 0 1 3.333-4.359V.667a.75.75 0 0 1 .75-.75Zm4.591 2.857a.75.75 0 0 0 1.398.257 3.25 3.25 0 0 1 1.68 1.726c.109.26.176.586.212 1.106.036.526.036 1.195.036 2.137s0 1.612-.036 2.138c-.036.52-.103.845-.211 1.106a3.25 3.25 0 0 1-1.76 1.759c-.26.108-.586.175-1.105.211-.527.036-1.196.036-2.138.036s-1.611 0-2.138-.036c-.52-.036-.845-.103-1.106-.211a3.25 3.25 0 0 1-1.759-1.759c-.108-.26-.175-.586-.21-1.106C2.75 9.612 2.75 8.942 2.75 8V5.765c0-1.27.784-2.355 1.895-2.8a.75.75 0 0 0 1.434-.215H8c.82 0 1.432 0 1.924.024ZM6.494 11V5.182H5.34l-1.44.912v1.091L5.23 6.35h.034V11h1.23ZM7.47 9.01v.969h2.792V11h1.176V9.978h.722v-.986h-.722v-3.81H9.9L7.469 9.01Zm2.815-2.486h-.046L8.71 8.946v.046h1.576V6.523Z"
        fill="#22282F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const FilterMonthDueIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.333-.083a.75.75 0 0 1 .75.75v.583h1.944c.748 0 1.368 0 1.89.023V.667a.75.75 0 0 1 1.5 0v.806c.137.04.27.085.4.139a4.75 4.75 0 0 1 2.571 2.57c.197.475.281.983.322 1.579.04.583.04 1.303.04 2.212v.055c0 .908 0 1.629-.04 2.212-.04.596-.125 1.104-.322 1.578a4.75 4.75 0 0 1-2.57 2.57c-.474.197-.982.282-1.578.322-.584.04-1.304.04-2.213.04h-.054c-.91 0-1.63 0-2.213-.04-.596-.04-1.104-.125-1.578-.321a4.75 4.75 0 0 1-2.57-2.57c-.197-.475-.282-.983-.322-1.579-.04-.583-.04-1.304-.04-2.212V5.765a4.517 4.517 0 0 1 3.333-4.359V.667a.75.75 0 0 1 .75-.75Zm4.591 2.857a.75.75 0 0 0 1.398.257 3.25 3.25 0 0 1 1.68 1.726c.109.26.176.586.212 1.106.036.526.036 1.195.036 2.137s0 1.612-.036 2.138c-.036.52-.103.845-.211 1.106a3.25 3.25 0 0 1-1.76 1.759c-.26.108-.586.175-1.105.211-.527.036-1.196.036-2.138.036s-1.611 0-2.138-.036c-.52-.036-.845-.103-1.106-.211a3.25 3.25 0 0 1-1.759-1.759c-.108-.26-.175-.586-.21-1.106C2.75 9.612 2.75 8.942 2.75 8V5.765c0-1.27.784-2.355 1.895-2.8a.75.75 0 0 0 1.434-.215H8c.82 0 1.432 0 1.924.024Zm-5.666 8.087c.331.146.71.219 1.134.219.435 0 .822-.074 1.159-.222a1.92 1.92 0 0 0 .792-.608 1.42 1.42 0 0 0 .287-.883c.002-.362-.11-.663-.335-.904-.224-.242-.55-.39-.977-.446v-.045c.325-.059.59-.197.792-.415.205-.218.306-.49.304-.815a1.419 1.419 0 0 0-.25-.83 1.731 1.731 0 0 0-.701-.59 2.392 2.392 0 0 0-1.054-.22c-.398 0-.755.074-1.071.22a1.863 1.863 0 0 0-.75.599 1.515 1.515 0 0 0-.287.886H4.48a.665.665 0 0 1 .133-.386.8.8 0 0 1 .333-.253c.138-.06.29-.091.457-.091.165 0 .309.031.432.094a.694.694 0 0 1 .395.645c0 .153-.04.288-.12.403a.792.792 0 0 1-.335.267 1.18 1.18 0 0 1-.491.097H4.74v.903h.543c.22 0 .409.034.568.102a.835.835 0 0 1 .37.284.68.68 0 0 1 .13.412c0 .154-.04.29-.122.407a.816.816 0 0 1-.338.275c-.144.067-.31.1-.498.1-.18 0-.341-.03-.485-.088a.857.857 0 0 1-.347-.248.646.646 0 0 1-.14-.375H3.185c.006.34.103.639.293.898.191.258.451.46.781.608Zm4.956-.094c.353.239.773.36 1.262.361.488 0 .908-.12 1.258-.358s.62-.584.807-1.037c.19-.452.284-.998.284-1.636.002-.635-.092-1.174-.281-1.62-.19-.446-.46-.787-.813-1.022-.35-.235-.769-.352-1.255-.352-.487 0-.907.117-1.259.352-.35.233-.62.573-.81 1.02-.187.447-.28.987-.28 1.622-.003.636.09 1.18.278 1.633.189.453.459.799.81 1.037Zm2.06-1.162c-.199.336-.465.503-.798.503a.84.84 0 0 1-.58-.221c-.165-.15-.292-.373-.383-.67-.09-.3-.134-.673-.134-1.12.002-.661.102-1.157.301-1.489.2-.331.464-.497.796-.497a.83.83 0 0 1 .576.222c.165.147.292.368.381.662.091.293.136.66.136 1.102.002.67-.096 1.173-.295 1.508Z"
        fill="#22282F"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export const AddIcon = props => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 7C2.25 4.37665 4.37665 2.25 7 2.25C9.62335 2.25 11.75 4.37665 11.75 7C11.75 9.62335 9.62335 11.75 7 11.75C4.37665 11.75 2.25 9.62335 2.25 7ZM7 1.25C3.82436 1.25 1.25 3.82436 1.25 7C1.25 10.1756 3.82436 12.75 7 12.75C10.1756 12.75 12.75 10.1756 12.75 7C12.75 3.82436 10.1756 1.25 7 1.25ZM7.49998 4.66667C7.49998 4.39052 7.27613 4.16667 6.99998 4.16667C6.72384 4.16667 6.49998 4.39052 6.49998 4.66667V6.5H4.66665C4.39051 6.5 4.16665 6.72386 4.16665 7C4.16665 7.27614 4.39051 7.5 4.66665 7.5H6.49998V9.33333C6.49998 9.60948 6.72384 9.83333 6.99998 9.83333C7.27613 9.83333 7.49998 9.60948 7.49998 9.33333V7.5H9.33332C9.60946 7.5 9.83332 7.27614 9.83332 7C9.83332 6.72386 9.60946 6.5 9.33332 6.5H7.49998V4.66667Z"
      fill="white"
    />
  </Svg>
);

export const CloseIcon = props => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.72 4.22a.75.75 0 0 1 1.06 0l3.97 3.97 3.97-3.97a.75.75 0 1 1 1.06 1.06l-3.97 3.97 3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97-3.97-3.97a.75.75 0 0 1 0-1.06Z"
      fill="#22282F"
    />
  </Svg>
);

export const MenuFileAddFolderIcon = props => (
  <Svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 7a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0ZM7 1.25a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5Zm.5 3.417a.5.5 0 1 0-1 0V6.5H4.667a.5.5 0 0 0 0 1H6.5v1.833a.5.5 0 1 0 1 0V7.5h1.833a.5.5 0 0 0 0-1H7.5V4.667Z"
      fill="#fff"
    />
  </Svg>
);

export const RemoveIcon = props => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={10} cy={10} r={10} fill="#fff" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.97 5.97a.75.75 0 0 1 1.06 0L10 8.94l2.97-2.97a.75.75 0 1 1 1.06 1.06L11.06 10l2.97 2.97a.75.75 0 1 1-1.06 1.06L10 11.06l-2.97 2.97a.75.75 0 0 1-1.06-1.06L8.94 10 5.97 7.03a.75.75 0 0 1 0-1.06Z"
      fill="red"
    />
  </Svg>
);

export const ModalAddUsersIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.625 2.375a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.125 5.5a2 2 0 0 0-2 2c0 .414.336.75.75.75h6.25a.75.75 0 0 0 .75-.75 2 2 0 0 0-2-2H3.75Zm-3 2a3 3 0 0 1 3-3H7.5a3 3 0 0 1 3 3 1.75 1.75 0 0 1-1.75 1.75H2.5a1.75 1.75 0 0 1-1.75-1.75ZM13 4.375a.5.5 0 0 0-1 0V5.75h-1.375a.5.5 0 0 0 0 1H12v1.375a.5.5 0 0 0 1 0V6.75h1.375a.5.5 0 0 0 0-1H13V4.375Z"
      fill="#535D74"
    />
  </Svg>
);