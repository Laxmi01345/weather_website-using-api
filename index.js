const currdate=document.querySelector(".container1 .template .currdate")

function todaydate(){
    let p=new Date;
    let hours=p.getHours();
    let minutes=p.getMinutes();
    let ampm= hours >=12 ? "PM":"AM";
    
    const weekday=["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];
    let day=weekday[p.getDay()];
    let date=p.getDate();
    let year=p.getFullYear();

    hours=hours%12;
    hours=hours?hours:12;

    minutes=minutes.toString().padStart(2,"0");
    const finaldate=hours+":"+minutes+" "+ampm+", "+day+", "+date+", "+year;
    currdate.innerHTML=finaldate;

}

todaydate()

const inputtext=document.getElementById("searchbar");
inputtext.addEventListener('change',function(){
    
    let searchinput=this.value;
    document.getElementById("city").innerHTML=searchinput;
    
    weatherconditon(searchinput)


})



function weatherconditon(searchinput){
    
    const api='cbc08a0e19ea468c83740851241301'
    const url=`https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${searchinput}&days=5&aqi=yes&alerts=yes`
    
    const fetchpromise=fetch(url);
    fetchpromise.then((response)=>
        response.json()
    )
    .then((response) => {
    
        const img = document.querySelector(".container1 .template img"); 

        
        let icons=response.current.condition.icon; 
        let day=response.current.condition.text;
        let humidity=response.current.humidity;
        let wind_speed=response.current.wind_kph;
        let temp=response.current.temp_f;
        console.log(humidity)
        console.log(wind_speed)
        img.src=icons;
        const climate= document.querySelector(".container1 .template #climate");
        climate.innerHTML=day;

        const hum=document.querySelector(".container1 .template .humidity");
        hum.innerHTML=humidity+" %";

        const wind=document.querySelector(".container1 .template .wind_speed");
        wind.innerHTML=wind_speed+" km/hr";

        const temp_f=document.querySelector(".container1 .template .temp");
        temp_f.innerHTML=temp+" °F"


         // forcasting

         const partition2 = document.querySelector(".partition2");
            partition2.innerHTML = "";
         
        for(let i=0;i<5;i++){
            const forecast=response.forecast.forecastday[i].date;
            const icon=response.forecast.forecastday[i].day.condition.icon;
            const textt=response.forecast.forecastday[i].day.condition.text;
            const humidity=response.forecast.forecastday[i].day.avghumidity;
            
                     
            const div=document.createElement("div");
            div.id="t";
            let para=document.createElement("p");
            para.innerText=forecast;
            div.appendChild(para);

            let imgg=document.createElement("img");
            imgg.src=icon;
            imgg.id="imginner";
            
            div.appendChild(imgg)
           
            let imgtext=document.createElement("p");
            imgtext.innerText=textt;
            imgtext.id="imgtext";
            div.appendChild(imgtext);
            
            let avghum=document.createElement("p");
            const label=document.createElement('label');
            label.innerText='Humidity';
            label.id="labelhu";
            avghum.innerText=humidity+" %";
            avghum.id="hum";
            div.appendChild(label);
            div.appendChild(avghum);
            document.querySelector(".partition2").appendChild(div);    
            
            
         }




         

         let data=[]

         for (let i=0;i<22;i++){
            const forecast=response.forecast.forecastday[0].hour[i].temp_f;
            data.push(forecast)

            

         }
         const chartContainer = document.getElementById("myChart");
         if (chartContainer) {
             chartContainer.parentNode.removeChild(chartContainer);
         }

         // Create a new canvas for the chart
         const newChartContainer = document.createElement("canvas");
         newChartContainer.id = "myChart";
         document.querySelector(".chart").appendChild(newChartContainer);

         
         const xvalues=['00:00','1:00am','2:00am','3:00am','4:00am','5:00am','6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00am','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm','8:00pm','9:00pm','10:00pm','11:00pm','12:00pm'];

         new Chart("myChart", {
            type:"line",
            data: {
                labels:xvalues,
                datasets:[{
                data:data,
                borderColor:"red",
                fill:true
            }]
        },
        options: {
            legend: {display: false}
          }
         });



        }
         
        

    )

}




