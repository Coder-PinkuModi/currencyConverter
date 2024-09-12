const URL=`https://latest.currency-api.pages.dev/v1/currencies`;
const currencyCode = countryList;
const dropdowns = document.querySelectorAll(".dropdown select");
const inputVal = document.querySelector("input");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const flagFrom = document.querySelector(".from span");
const flagTo = document.querySelector(".to span");
const button=document.querySelector("button");
const msg=document.querySelector(".msg");


for(select of dropdowns){ //for making dropdowns in select option that is country currency
    for(code in currencyCode){
        const options=document.createElement("option");
        options.innerText=code;
        options.value=code;
        if (select.name === "from" && code === "USD") {
            options.selected = "selected";
          } else if (select.name === "to" && code === "INR") {
            options.selected = "selected";
          }
        select.append(options);
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

const UpgradeChanges =async (fromcurrency,tocurrency)=>{
    
        let amtVal=inputVal.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        inputVal.value = "1";
    }

    let url1=`${URL}/${fromcurrency}.json`;
    let result=await fetch(url1);
    let changeCurr=await result.json();
    let rate=changeCurr[fromcurrency][tocurrency];
    finalAmount=amtVal*rate;
    msg.innerText = `${amtVal} ${fromcurrency.toUpperCase()} = ${finalAmount} ${tocurrency.toUpperCase()}`;
};

const updateFlag=(element)=>{ // updating flag
    let curr=element.value;
    let countryCode=countryList[curr].toLowerCase();
    if(element.name=="from"){
    flagFrom.className = '';
    flagFrom.classList.add(`fi`);
    flagFrom.classList.add(`fi-${countryCode}`);
    }
    else if(element.name == "to"){
    flagTo.className = '';
    flagTo.classList.add(`fi`);
    flagTo.classList.add(`fi-${countryCode}`);
    }
}



button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    let fromSel=fromSelect.value;
    let toSel=toSelect.value;
    UpgradeChanges(fromSel.toLowerCase(),toSel.toLowerCase());
})

window.addEventListener("load", () => {
    let fromSel=fromSelect.value;
    let toSel=toSelect.value;
    UpgradeChanges(fromSel.toLowerCase(),toSel.toLowerCase());
});