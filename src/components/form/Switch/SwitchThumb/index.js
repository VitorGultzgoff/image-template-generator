import { styled } from "@mui/system";

const SwitchThumb = styled("span")`
  position: absolute;
  display: block;
  background-color: #0059B2;
  width: 30px;
  height: 100%;
  border-radius: 8px;
  top: 3px;
  left: 8px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(50px);
  }
`;

export default SwitchThumb;
