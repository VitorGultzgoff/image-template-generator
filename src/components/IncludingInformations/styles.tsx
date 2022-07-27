import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

export const NextActionContainer = styled(Grid)`
  @media only screen and (min-width: 900px) {
    margin-top: 20px;
  }
`;

export const IncludingInfoActionBtn = styled(Button)`
  min-width: 130px;
`;

export const PreviousActionContainer = styled(Grid)`
  margin-top: 20px;
`;

export const ProductInfoContainer = styled(Grid)`
  display: flex;
  margin-top: 25px;
  width: 100%;
`;

export const ProductInfoInput = styled(TextField)`
  max-width: 350px;
`;

export const ProductInfoInputValueContainer = styled(Grid)`
  margin-top: 10px;
`;
