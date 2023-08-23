import { styled } from "styled-components";
import type { IDigitType, INsType } from "../interfaces";

export const weatherIcons = {
    "01d": "/weather/day.svg",
    "02d": "/weather/cloudy-day-1.svg",
    "03d": "/weather/cloudy-day-2.svg",
    "04d": "/weather/cloudy-day-3.svg",
    "09d": "/weather/rainy-4.svg",
    "10d": "/weather/rainy-1.svg",
    "11d": "/weather/thunder.svg",
    "13d": "/weather/snowy-3.svg",
    "50d": "/weather/cloudy-day-3.svg",
    "01n": "/weather/night.svg",
    "02n": "/weather/cloudy-night-1.svg",
    "03n": "/weather/cloudy-night-2.svg",
    "04n": "/weather/cloudy-night-3.svg",
    "09n": "/weather/rainy-4.svg",
    "10n": "/weather/rainy-5.svg",
    "11n": "/weather/thunder.svg",
    "13n": "/weather/snowy-5.svg",
    "50n": "/weather/cloudy-day-3.svg",
};

export const digit: IDigitType = {
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
};

// Currency Num to Word
export const NS: INsType[] = [
    { value: 10000000, str: "Crore" },
    { value: 100000, str: "Lakh" },
    { value: 1000, str: "Thousand" },
    { value: 100, str: "Hundred" },
    { value: 90, str: "Ninety" },
    { value: 80, str: "Eighty" },
    { value: 70, str: "Seventy" },
    { value: 60, str: "Sixty" },
    { value: 50, str: "Fifty" },
    { value: 40, str: "Forty" },
    { value: 30, str: "Thirty" },
    { value: 20, str: "Twenty" },
    { value: 19, str: "Nineteen" },
    { value: 18, str: "Eighteen" },
    { value: 17, str: "Seventeen" },
    { value: 16, str: "Sixteen" },
    { value: 15, str: "Fifteen" },
    { value: 14, str: "Fourteen" },
    { value: 13, str: "Thirteen" },
    { value: 12, str: "Twelve" },
    { value: 11, str: "Eleven" },
    { value: 10, str: "Ten" },
    { value: 9, str: "Nine" },
    { value: 8, str: "Eight" },
    { value: 7, str: "Seven" },
    { value: 6, str: "Six" },
    { value: 5, str: "Five" },
    { value: 4, str: "Four" },
    { value: 3, str: "Three" },
    { value: 2, str: "Two" },
    { value: 1, str: "One" },
];

export const DangerousHtml = styled.div`
    overflow: hidden;
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 1px solid;
        td {
            border: 1px solid;
            padding: 5px;
        }
    }
`;
