const generatedpassword  = document.querySelector("[generatedpassword]")
const copybutton  = document.querySelector("[copybutton]")
const copiedtextmssg  = document.querySelector("[copiedtextmssg]")
const passwordlengthdisplay  = document.querySelector("[passwordlength]")
const inputslider  = document.querySelector("[inputslider]")
const uppercaseCheck  = document.querySelector("#uppercase")
const lowercaseCheck  = document.querySelector("#lowercase")
const NumbersCheck  = document.querySelector("#Numbers")
const SymbolsCheck  = document.querySelector("#Symbols")
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const strengthindicator  = document.querySelector("[strengthindicator]")
const passwordgeneratebutton  = document.querySelector("[passwordgeneratebutton]")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength =10;
let len = 0;
setSlider();

function setSlider(){
    passwordLength = inputslider.value ;
    passwordlengthdisplay.innerHTML = passwordLength;
}
function setcolor(color){
    strengthindicator.style.backgroundcolor = color;
}
function getrandominteger(min,max){
    return math.floor((math.random()*(max-min))+min);
}
function getuppercase(){
    return string.fromCharCode(getrandominteger(65,91));
}
function getlowercase(){
    return String.fromCharCode(getrandominteger(97,123));
}
function getnum(){
    return getrandominteger(0,9);
}
function getsymbol(){
    return symbols.charAt(getrandominteger(0,symbols.length));
}
function passwordstrength(){
    let uc = false;
    let lc = false;
    let num = false;
    let sym = false;

    if(uppercaseCheck.checked) uc= true;
    if(lowercaseCheck.checked) lc= true;
    if(NumbersCheck.checked) num = true;
    if(SymbolsCheck.checked) sym = true;

    if (uc && lc && (num || sym) && passwordLength >= 8) {
        setcolor("#0f0");
      } else if (
        (lc || uc) &&
        (num || sym) &&
        passwordLength >= 6
      ) {
        setcolor("#ff0");
      } else {
        setcolor("#f00");
      }
}
async function copyonclipboard(){
    try {
        await navigator.clipboard.writeText(generatedpassword.value)
        copiedtextmssg.innerText = "copied";
    } catch (e) {
       copiedtextmssg.innerText = "failed";      
    }
    copiedtextmssg.classList.add(".activity")
    setTimeout(() => {
        copiedtextmssg.classList.remove(".activity");
    }, 2000);
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
function handleCheckBoxChange() {
    let len =0;
    allCheckBox.forEach((checkbox)=>{if(checkbox.checked) len++;})
    if (len>passwordLength) {
        passwordLength = len;
        setSlider();
    }
}

allCheckBox.forEach((checkbox)=>{checkbox.addEventListener('change' , handleCheckBoxChange)})

inputslider.addEventListener('input', (e)=>{passwordLength = e.target.value;  setSlider();} )

copybutton.addEventListener('click' , ()=>{if(generatedpassword.value) copyonclipboard() })

passwordgeneratebutton.addEventListener('click' , ()=>{
    if (len ==0) {
        return;
    }
    if (len > passwordLength) {
        passwordLength = len;
        setSlider();
    } 
    password = "";

    let arr =[];
    if (uppercaseCheck.checked) {
        arr.push(getuppercase);
    }
    if (lowercaseCheck.checked) {
        arr.push(getlowercase);
    }
    if (NumbersCheck.checked) {
        arr.push(getnum);
    }
    if (SymbolsCheck.checked) {
        arr.push(getsymbol);
    }
    for (let i = 0; i < arr.length; i++) {
        password += arr[i]();
    }
    for (let i = 0; i < passwordLength-arr.length; i++) {
        let k = getrandominteger(0,arr.length);
        password += arr[k]();
    }
    password = shufflePassword(Array.from(password));
    generatedpassword.value = password;
    passwordstrength();

} )