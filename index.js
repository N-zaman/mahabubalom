 var mamlaID;
    const mainFormHolder = document.getElementById("mainForm");
    const updateFormHolder = document.getElementById("updateForm");
    const container = document.getElementById('mamlaInfo');

// Populate days
const daySelects = document.getElementsByClassName("day");
for (let i = 0; i < daySelects.length; i++) {
  const select = daySelects[i];
  for (let d = 1; d <= 31; d++) {
    let option = document.createElement("option");
    option.value = d;
    option.text = d;
    select.add(option);
  }
}

// Populate months
const monthSelects = document.getElementsByClassName("month");
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
for (let i = 0; i < monthSelects.length; i++) {
  const select = monthSelects[i];
  for (let j = 0; j < months.length; j++) {
    let option = document.createElement("option");
    option.value = j + 1;
    option.text = months[j];
    select.add(option);
  }
}

// Populate years (1900–current year)
const yearSelects = document.getElementsByClassName("year");
const currentYear = new Date().getFullYear();
for (let i = 0; i < yearSelects.length; i++) {
  const select = yearSelects[i];
  for (let y = (currentYear+2); y >=.2015; y--) {
    let option = document.createElement("option");
    option.value = y-2000;
    option.text = y;
    select.add(option);
  }
}

    // Get selected date
    function getDate(i) {
      const day = daySelects[i].value;
      const month = monthSelects[i].value; 
      const year = yearSelects[i].value;
      return (day+"/"+month+"/"+year)
    }
    
  
  async function bismillah(){
		await fetch('https://caseserver-aqqb.onrender.com/api/mamla')
			  .then(res => res.json())
			  .then(data => console.log(data));
  }
  
  bismillah();
  
  

    function hisab(){

      let mamlaFee;
      const price = parseInt(document.getElementById("mamlaFee").value)
    if(price<=50000){
      mamlaFee = "আপনাকে দিতে হবে 3245 টাকা ";
  }
    else if(price>50000 && price<3398822 ){
        let temp = price - 50000;
        let total = (temp/5000)*57 + 3245 ;
		let grandTotal = total + (total *2)/100;
        mamlaFee = "আপনাকে দিতে হবে " + grandTotal.toFixed(2) + " টাকা ";
    }else{
		mamlaFee = "আপনাকে দিতে হবে ৪২২৫০ টাকা " ;
	}


    const div = document.createElement("div");
    div.className = "case-info";
    div.innerHTML = `
      <h2>আপনাকে দিতে হবেঃ  </h2>
      <p>${mamlaFee}</p>
    `

    document.getElementById("priceInput").prepend(div);

}

    function calHissa(){
      const totalLand = parseFloat(document.getElementById("motJomi").value);
      const totalSons = parseInt(document.getElementById("motPutro").value)
      const totalDaughters = parseInt(document.getElementById("motKonna").value)
      const totalWife = parseInt(document.getElementById("motWife").value)
      const div = document.createElement("div");
      div.className = "case-info";

      let temp,wifeGet,daughtersGet,sonGet,divElem = '';
	  wifeGet = 0;

      if(totalWife){
        wifeGet = (totalLand/(8*totalWife)).toFixed(2);
        divElem = `
                <p><strong>প্রত্যেক স্ত্রী পাবেঃ </strong> ${wifeGet} শতাংশ </p>
      `
        temp = totalLand - wifeGet*totalWife;
      }else{
        temp = totalLand;
      }

      if(!totalSons && totalDaughters){

        daughtersGet = (temp/totalDaughters).toFixed(2);
        divElem = divElem + `

        <p><strong>প্রত্যেক কন্যা পাবেঃ</strong> ${daughtersGet} শতাংশ </p>

      ` 

      }
      else if(totalSons && !totalDaughters){

        sonGet = (temp/totalSons).toFixed(2);
        divElem = divElem + `

        <p><strong>প্রত্যেক পুত্ত্র পাবেঃ</strong> ${sonGet} শতাংশ </p>

      ` 

      }
      else if(totalSons && totalDaughters){
        daughtersGet = (temp/(totalDaughters+2*totalSons)).toFixed(2);
        sonGet = (daughtersGet*2).toFixed(2);

      divElem = divElem +  `
        <p><strong>প্রত্যেক পুত্ত্র পাবেঃ </strong> ${sonGet} শতাংশ </p>
        <p><strong>প্রত্যেক কন্যা পাবেঃ</strong> ${daughtersGet} শতাংশ </p>
      `
      }

      div.innerHTML = divElem

      
      document.getElementById("sotokerHisabId").prepend(div);
    }
    async function searchMmlaDetails(){
            mainFormHolder.style.display = "none";
            updateFormHolder.style.display = "none"
      containerRemove();
      const searchValue = document.getElementById("searchMamlaNO").value;
      const searchValueArray = searchValue.replaceAll(" ","").split("/")
      console.log(searchValueArray);
      if(searchValueArray[1]){
        searchValueArray[1]= parseInt(searchValueArray[1])
      }else{
        searchValueArray[1]=0;
      }
      if(searchValueArray[2]){
          searchValueArray[2] = parseInt(searchValueArray[2]);
          if(searchValueArray[2]>2000){ searchValueArray[2] -=2000}
      }else{
          searchValueArray[2] = 0;
      }
      console.log(searchValueArray)
      console.log(searchValueArray[0]+"/"+searchValueArray[1]+"/"+searchValueArray[2])

      await fetch(`https://caseserver-aqqb.onrender.com/api/mamla/${searchValueArray[0]}?year=${searchValueArray[1]}&date=${searchValueArray[2]}`)
      .then(res => res.json())
      .then(data => {
        if(!data[0]) alert("you input wrong data or wrong style");
data.forEach((x)=>{
const singleMamla = Result(x);
container.prepend(singleMamla);
})

      } );
    }

    const postFunction =async (myobject)=>{


await fetch("https://caseserver-aqqb.onrender.com/api/mamla", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(myobject)
})
.then(res => res.json())
.then(data => {
  console.log(data)
  const htmlFile = Result(data);
container.prepend(htmlFile);
});
}




    async function submitForm() {
      containerRemove();
      const detailsArray = [{
        date: new Date().toLocaleDateString('en-GB',{
                year: "2-digit",  
                month: "numeric",  
                day: "numeric"     
                }),
        nextStep: document.getElementById('nextStep').value,
        nextDate: getDate(0),
        comment: document.getElementById('comment').value
      }];

      const formData = {
        admin:document.getElementById('password').value,
        mamlaNO: document.getElementById('mamlaNO').value,
        courtName: document.getElementById('courtName').value,
        mamlakarigon: document.getElementById('mamlakarigon').value,
        mamlarPokkho: document.getElementById('mamlarPokkho').value,
        mobile: document.getElementById('mobile').value,
        mamladetails: detailsArray
      };

      postFunction(formData);
 

mainFormHolder.style.display = "none";
    };


    const addDetail = async (mamlaId,detail) => {

  await fetch(`https://caseserver-aqqb.onrender.com/api/mamla/${mamlaId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(detail)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const htmlFile = Result(data);
    container.prepend(htmlFile)
  })
  .catch(err => console.error("❌ Error:", err));
};


    async function updateFormData(){

console.log(mamlaID,"after update");
const updateArray = {
        admin:document.getElementById('u_password').value,
        date: new Date().toLocaleDateString('en-GB',{
                year: "2-digit",   
                month: "numeric",  
                day: "numeric"    
                }),
        nextStep: document.getElementById('u_nextStep').value,
        nextDate: getDate(1),
        comment: document.getElementById('u_comment').value
      };

      addDetail(mamlaID,updateArray);

      updateFormHolder.style.display = "none";

    }

    function mainForm(){
containerRemove();
      mainFormHolder.style.display = "block";
 updateFormHolder.style.display = "none"
 
    }

    function updateForm(){

mamlaID = document.getElementById("mamlaSpan").innerText;
containerRemove();
      updateFormHolder.style.display = "block";
 mainFormHolder.style.display = "none";


    }



function Result(data) {
  const div = document.createElement("div");

  // Generate table rows from data.mamladetails
  const rows = data.mamladetails.map(i => `
    <tr>
      <td>${i.date}</td>
      <td>${i.nextStep}</td>
      <td>${i.nextDate}</td>
      <td>${i.comment}</td>
    </tr>
  `).join("");

  div.innerHTML = `
    <div class="case-info">
      <h2>মামলার তথ্য</h2>
      <p><strong>মামলা নম্বর:</strong>  <span id="mamlaSpan"> ${data.mamlaNO}</span></p>
      <p><strong>আদালতের নাম:</strong> ${data.courtName}</p>
      <p><strong>মামলাকারীগণ:</strong> ${data.mamlakarigon}</p>
      <p><strong>মামলার পক্ষ:</strong> ${data.mamlarPokkho}</p>
      <p><strong>মোবাইল:</strong> <a href="tel:+88${data.mobile}">${data.mobile}</a></p>
    </div>

    <table>
      <caption>মামলার বিস্তারিত</caption>
      <thead>
        <tr>
          <th>তথ্য প্রবেশের তারিখ</th>
          <th>পরবর্তী পদক্ষেপ</th>
          <th>পরবর্তী তারিখ</th>
          <th>মন্তব্য</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
<div>
<button id="updateMamla" type="button" onclick="updateForm()"><a href="#updateForm">তথ্য আপডেট করুন</a></button> 
</div>
  `

  return div;
}


function containerRemove(){
  container.innerHTML = "";
}

