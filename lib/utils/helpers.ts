import dayjs from "dayjs";
import type { IUomTypes } from "../interfaces";
import { NS, digit } from "./constants";

export const uomPrecision: IUomTypes =
    typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("uom_precision") as string)
        : {
              DM: 2,
              KG: 2,
              KM: 2,
              L: 2,
              M: 2,
              MT: 2,
              Mbps: 2,
              O: 2,
              Pcs: 0,
              Ton: 2,
              gm: 2,
              lb: 2,
          };

export const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const lowercase = (string: string): string => {
    return string.toLowerCase();
};

export const formatPrice = (number: unknown): string => {
    const fnumber = parseFloat(number as string);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(fnumber);
};

// Get wind direction
export const windDirection = (degree: number) => {
    const sectors = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

    degree += 22.5;

    if (degree < 0) {
        degree = 360 - (Math.abs(degree) % 360);
    } else {
        degree = degree % 360;
    }

    const which = parseInt(String(degree / 45), 10);
    return sectors[which];
};

const toCamelCase = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[-_]+/g, " ")
        .replace(/[^\w\s]/g, "")
        .replace(/ (.)/g, function ($1) {
            return $1.toUpperCase();
        })
        .replace(/ /g, "");
};

type Obj = {
    [key: string]: any;
};

export const objectToCamelCase = (origObj: Obj): Obj => {
    return Object.keys(origObj).reduce(function (newObj: Obj, key: string) {
        const val = origObj[key];
        const newVal = typeof val === "object" ? objectToCamelCase(val) : val;
        newObj[toCamelCase(key)] = newVal;
        return newObj;
    }, {});
};

export const cleanString = (string: string): string => {
    const newString = !string ? "" : string.replaceAll("_", " ");
    return capitalize(newString);
};

export const apsisDate = (string: string) => {
    return !string ? "" : dayjs(string).format("DD-MM-YYYY");
};

export const apsisMonth = (string: string) => {
    return !string ? "" : dayjs(string).format("YYYY-MM");
};

export const apsisDateTime = (string: string) => {
    return !string ? "" : dayjs(string).format("DD-MM-YYYY, hh:mm A");
};

export const stringToObjectArray = (
    string: string
): { label: string; value: string }[] => {
    const data = string.split(",");
    const result: { label: string; value: string }[] = [];
    for (let i = 0; i < data.length; ++i) {
        const obj:any = {
            label: data[i],
            value: data[i],
        };
        result.push(obj);
    }
    return result;
};

export const apsisMoney = (
    amount: number | string,
    currency = "",
    precision = 2
): string => {
    const numericAmount = Number(amount);
    if (!isNaN(numericAmount)) {
        const number = numericAmount.toFixed(precision);
        const result = Intl.NumberFormat("en-US").format(Number(number));
        return `${result} ${currency}`;
    } else if (!isNaN(Number(amount))) {
        return `${amount} ${currency}`;
    } else {
        return "";
    }
};

export const apsisQuantity = (quantity: number | string, uom = ""): string => {
    let data: string | number = 0;
    if (quantity && !isNaN(Number(quantity))) {
        const precision =
            uomPrecision && uom ? uomPrecision[uom as keyof IUomTypes] : 2;
        const number = parseFloat(String(quantity)).toFixed(precision);

        if (precision === 0) {
            data = number;
        } else {
            data = Intl.NumberFormat("en-IN", {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
            }).format(Number(number));
        }
    }

    return `${data} ${uom ?? ""}`;
};

export const apsisNextWord = (str: string): string => {
    if (!/^\d+$/.test(str) && /[0-9]+$/.test(str)) {
        const numberMatch = String(str).match(/[0-9]+$/);
        const number = numberMatch ? Number(numberMatch[0]) + 1 : 1;

        const stringMatch = String(str).match(/^\D+/);
        const string = stringMatch ? stringMatch[0] : "";

        return string + number;
    } else {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const length = alphabet.length;
        let result = str;
        let i = str.length;

        while (i >= 0) {
            const last = str.charAt(--i);
            let next = "";
            let carry = false;

            if (isNaN(Number(last))) {
                const index = alphabet.indexOf(last.toLowerCase());

                if (index === -1) {
                    next = last;
                    carry = true;
                } else {
                    const isUpperCase = last === last.toUpperCase();
                    next = alphabet.charAt((index + 1) % length);
                    if (isUpperCase) {
                        next = next.toUpperCase();
                    }

                    carry = index + 1 >= length;
                    if (carry && i === 0) {
                        const added = isUpperCase ? "A" : "a";
                        result = added + next + result.slice(1);
                        break;
                    }
                }
            } else {
                next = String(+last + 1);
                if (+next > 9) {
                    next = "0";
                    carry = true;
                }

                if (carry && i === 0) {
                    result = "1" + next + result.slice(1);
                    break;
                }
            }

            result = result.slice(0, i) + next + result.slice(i + 1);
            if (!carry) {
                break;
            }
        }
        return result;
    }
};

export const apsisTabChange = (index: number): void => {
    if (index > 0) {
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?tab=${index}`
        );
    } else {
        window.history.replaceState(null, "", `${window.location.pathname}`);
    }
};

export const envProducer = (type: "public" | "api"): string => {
    const url = import.meta.env.VITE_API_URL as string || 'https://ificapi.apsissolutions.com/api/v1';
  
    

    if (type === "public") {
        return url.replace("api/v1", "");
    } else if (type === "api") {
        return url;
    }

    return url;
};

const floatNumToWord = (number: number, result: string | unknown) => {
    let temp = "";
    const str = number.toString().split(".")[1]?.substring(0, 2);
  
    if (str) {
      for (let i = 0; i < str.length; i++) {
        const element:string = str[i]!;
        temp = temp + (digit[element as any] || '') + " ";
      }
      result = `${result} Point ${temp.trim()}`;
    }
  
    return result;
  };

export const intToEnglish = (number: number): string => {
    const floatNumber = number;
    let result = "";

    for (const n of NS) {
        if (number >= n.value) {
            if (number <= 99) {
                result += n.str;
                number -= n.value;
                if (number > 0) result += " ";
            } else {
                const t = Math.floor(number / n.value);
                const d = number % n.value;
                if (d > 0) {
                    return (
                        intToEnglish(t) + " " + n.str + " " + intToEnglish(d)
                    );
                } else {
                    return intToEnglish(t) + " " + n.str;
                }
            }
        }
    }

    if (number?.toString().split(".").length > 1) {
        const finalResult: string = floatNumToWord(
            floatNumber,
            result
        ) as string;
        return finalResult;
    } else {
        return result;
    }
};

export const numberToWords = (n: number): string => {
    const num: string[] =
        "Zero One Two Three Four Five Six Seven Eight Nine Ten Eleven Twelve Thirteen Fourteen Fifteen Sixteen Seventeen Eighteen Nineteen".split(
            " "
        );
    const tens: string[] =
        "Twenty Thirty Forty Fifty Sixty Seventy Eighty Ninety".split(" ");

    if (n < 20) return num[n]!;

    const digit = n % 10;

    if (n < 100) {
        return tens[Math.floor(n / 10) - 2] + (digit ? "-" + num[digit] : "");
    }

    if (n < 1000) {
        return (
            num[Math.floor(n / 100)] +
            " Hundred" +
            (n % 100 === 0 ? "" : " " + numberToWords(n % 100))
        );
    }

    return (
        numberToWords(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 !== 0 ? " " + numberToWords(n % 1000) : "")
    );
};

export function dateMinMaxValidation(
    current: dayjs.Dayjs,
    min?: dayjs.Dayjs,
    max?: dayjs.Dayjs
): boolean {
    if (min && max) {
        const dateStart = dayjs(min).startOf("day");
        const dateEnd = dayjs(max).endOf("day");
        return !(
            (dateStart.isBefore(current) || dateStart.isSame(current)) &&
            dateEnd.isAfter(current)
        );
    } else if (min) {
        const dateStart = dayjs(min).startOf("day");
        return !(dateStart.isBefore(current) || dateStart.isSame(current));
    } else if (max) {
        const dateEnd = dayjs(max).endOf("day");
        return !dateEnd.isAfter(current);
    }

    return true;
}
