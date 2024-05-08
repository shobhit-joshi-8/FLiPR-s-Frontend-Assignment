import { IconButton, Menu, MenuItem, Select, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

function LanguageDropdown({ currentLanguage, setLanguage, languages }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const currentLanguage
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    setLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <>
   

      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentLanguage}
          label="language"
          sx={{width: "100px"}}
          fullwidth
          onChange={(e)=> setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
          <MenuItem value={lang.id} onClick={() => handleClose(lang.id)}>{lang.label}</MenuItem>
        ))}
        </Select>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {languages.map((lang) => (
          <MenuItem onClick={() => handleClose(lang.id)}>{lang.label}</MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default LanguageDropdown;
