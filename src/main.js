import { alert, defaultModules, success, error } from "@pnotify/core";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from "lodash.debounce";
import fetchCountries from "./fetchCountries";

defaultModules.set(PNotifyMobile, {});

// alert({ text: "🔄 Нова гра розпочата!" });

const listRef = document.querySelector(".list");
const inputRef = document.querySelector(".input");
const divRef = document.querySelector(".block");

inputRef.addEventListener(
  "input",
  debounce((e) => {
    const countriName = e.target.value;
    listRef.innerHTML = "";
    divRef.innerHTML = "";
    fetchCountries(countriName).then((res) => {
      if (res.length > 10) {
        alert({ text: "Зробіть запит більш точніший" });
        return;
      }
      if (res.length > 1 && res.length <= 11) {
        listRef.innerHTML = "";
        divRef.innerHTML = "";
        const countri = res
          .map((item) => {
            return `<li>${item.name.common}</li>`;
          })
          .join("");
        listRef.innerHTML = countri;
      }
      if (res.length == 1) {
        listRef.innerHTML = "";
        divRef.innerHTML = "";
        const countri = res.map((item) => {
          console.log(item);
        });
      }
    });
  }, 500),
);
