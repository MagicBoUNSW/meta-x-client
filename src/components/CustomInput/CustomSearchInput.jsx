import React from "react";
// nodejs library to set properties for components
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon18 from "components/Icons/SearchIcon18";
import Input from '@material-ui/core/Input';

const styles = {
  iconRoot: {
    marginTop: '6px'
  },
  inputSearch: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px',
    color: '#25345C',
    '::placeholder': {
      color: '#25345C'
    },
  },
};
const useStyles = makeStyles(styles);

export default function CustomSearchInput(props) {
  const classes = useStyles();
  return (
    <div style={{ marginTop: '18px' }}>
      <Input
        id="input-extrabar-search"
        classes={{ input: classes.inputSearch }}
        defaultValue="Find what you need..."
        // placeholder="Find what you need..."
        disableUnderline="true"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon18 classes={{ root: classes.iconRoot }} />
          </InputAdornment>
        }
      />
    </div>
  );
}
