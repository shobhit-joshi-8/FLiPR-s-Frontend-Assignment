import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import LeftTextArea from "./LeftTextArea";
import RightTextArea from "./RightTextArea";
import LanguageDropdown from "./LanguageDropdown";

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);


    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}



function InputBox() {
  const [translateFromLanguag, setTranslateFromLanguag] = useState("all");
  const [translateToLanguag, setTranslateToLanguag] = useState("hi");

  const [languagess, setLanguagess] = useState([]);
  const [enteredText, setEnteredText] = useState("");
  const [fetchedText, setFetchedText] = useState("");
  const [leftSelect, setLeftSelect] = useState("")
  const [rightSelect, setRightSelect] = useState("")


  
  const [leftSelectValue, setLeftSelectValue] = useState("")
  const [rightSelectValue, setRightSelectValue] = useState("")


  // console.log(leftSelectValue) 
  console.log(rightSelectValue, 'rightvalue') 

  console.log(languagess,"language")
  const getLanguages = async() => {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages';
  const options = {
    method: 'GET',
    headers: {
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': '4fddf94e98msh665b7bb7ac1c293p187b63jsn4728fcafb8b4',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    setLanguagess(result?.data?.languages)
  } catch (error) {
    console.error(error);
  }
  }
  // Debounce enteredText

  const translateLang = async() => {
    const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': '4fddf94e98msh665b7bb7ac1c293p187b63jsn4728fcafb8b4',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: new URLSearchParams({
		q: leftSelectValue,
		target: rightSelect,
		source: leftSelect
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	setRightSelectValue(result?.data?.translations[0].translatedText)
} catch (error) {
	console.error(error);
}
  }

  const debouncedEnteredText = useDebounce(enteredText, 2000);
  useEffect(()=> {
    getLanguages()
  },[])
  // useEffect(() => {
  //   if (debouncedEnteredText) {
  //     fetch(
  //       `https://api.mymemory.translated.net/get?q=${debouncedEnteredText}!&langpair=${
  //         translateFromLanguag === "all" ? "en" : translateFromLanguag
  //       }|${translateToLanguag}`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setFetchedText(data.responseData.translatedText);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }, [debouncedEnteredText, translateFromLanguag, translateToLanguag]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        flexDirection: { xs: "column", md: "row" },
        m: "1rem",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <LanguageDropdown
          currentLanguage={leftSelect}
          setLanguage={setLeftSelect}
          languages={languagess?.map((item)=>   ({
            label: item.language,
            id:item.language
          }))}
        />
        <LeftTextArea
          enteredText={leftSelectValue}
          translate={translateLang}
          setEnteredText={setLeftSelectValue}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <LanguageDropdown
          currentLanguage={rightSelect}
          setLanguage={setRightSelect}
          languages={languagess?.map((item)=>   ({
            label: item.language,
            id:item.language
          }))}
        />
        <RightTextArea
          fetchedText={rightSelectValue}
          setFetchedText={setRightSelectValue}
        />
      </Box>
    </Box>
  );
}

export default InputBox;
