/*THIS KEY IS ONLY FOR ACCESSING PUBLIC GOOGLE FILES*/
const public_apiKey = 'AIzaSyCAYyVQq7KCgTqcXN9pcpCJ9T3PnvtlT9g';

const sheetId = '1--4Wi2IodFN67CIhpB9wW1SPU53hHsE-zmuFeBoOiNs';
const range = 'Sheet1';


async function fetchJobsORIG()
{
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${public_apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.values);
  });
}
async function fetchJobs()
{
    let response=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${public_apiKey}`)
    let data=await response.json();
    let rows=await data.values;
    console.log(rows);
    let week_jobs_list=await to_dictionaries(rows);

    let week_jobs=await get_current_week(week_jobs_list);
    console.log(week_jobs);
    display_week_jobs(week_jobs);
}
function toTitle(text)
{
    let first_letter=text.substring(0,1);
    first_letter=first_letter.toUpperCase();
    return first_letter+text.substring(1);
}
async function to_dictionaries(rows)
{
    let dict_arr=[];
    let keys=[];

    for(let j=0;j<rows[0].length;j++)
    {
        keys.push(rows[0][j]);
    }
    for(let i=1;i<rows.length;i++)
    {
        let dict={};
        for(let j=0;j<rows[i].length;j++)
        {
            dict[keys[j]]=rows[i][j];
        }
        dict_arr.push(dict);
    }
    return dict_arr;
}
async function get_current_week(week_jobs_list) 
{
    for(let i=0;i<week_jobs_list.length;i++)
    {
        let parts=week_jobs_list[i]["date"].split("/");
        week_jobs_list[i]["date_num"]=new Date(parts[2],parts[0]-1,parts[1]);
    }
    let today=new Date();
    today=today.setDate(today.getDate() - 1);
    console.log(week_jobs_list);
    week_jobs_list=week_jobs_list.filter(week_jobs=>week_jobs["date_num"]>=today);
    console.log(week_jobs_list);
    const week_jobs=week_jobs_list[0];
    return week_jobs;
}
async function display_week_jobs(week_jobs)
{
    let results_div=document.getElementById("results");
    results_div.innerHTML="";
    const jobs=["trash","mop","windex","bathroom"];
    
    let week_h1=document.createElement("h1");
    results_div.appendChild(week_h1);
    week_h1.innerHTML=`Week Jobs for ${week_jobs["date"]}`;

    for(let job of jobs)
    {
        let card=document.createElement("div");
        results_div.appendChild(card);
        card.classList.add("card");
        card.style.maxWidth="500px";

        let card_body=document.createElement("div");
        card.appendChild(card_body);
        card_body.classList.add("card-body");

        let card_title=document.createElement("h2");
        card_body.appendChild(card_title);
        card_title.innerHTML=toTitle(job);

        /*
        let card_text=document.createElement("p");
        card_body.appendChild(card_text);
        card_text.classList.add("card-text");
        card_text.innerHTML=week_jobs[job];
        */

        let ul=document.createElement("ul");
        card_body.appendChild(ul);
        card_body.classList.add("list-group");

        let names=week_jobs[job].split(",");
        for(let name of names)
        {
            let li=document.createElement("li");
            ul.appendChild(li);
            li.classList.add("list-group-item");
            li.innerHTML=toTitle(name);
        }
    }
}
fetchJobs();