let form = document.getElementById("form");
let empty = document.getElementById("empty");
let container = document.getElementById("todocard");
let addtask=document.getElementById("addtask");
let todoleft=document.querySelectorAll(".todoleft");
let todoright=document.querySelectorAll(".todoright");
let filter=document.getElementById("filter")
let i=1;
let global=[];
function filterfunc(e)
{
    container.innerHTML="";
    if(filter.value!="none")
    global.filter((eve)=>{
        return eve.priority == filter.value;
    }).forEach((e)=>{
        let card = document.createElement("div");
  card.className = "card";
  card.id=e.id;
  card.innerHTML = `
    <div class="carddiv">
        <p>${e.name}</p>
        <div class="icons">
            <i class="fa-regular fa-pen-to-square edit"></i>&nbsp;&nbsp;&nbsp;
            <i class="fa-solid fa-trash delete"></i>
        </div>
    </div>
    <span>Priority : <span id="priocolor">${e.priority}<span><span>
    <span id="carddate">${e.date}</span>
    `;
    card.addEventListener("blur",func)
    container.append(card);
    })
    else{
        global.forEach((e)=>{
            let card = document.createElement("div");
  card.className = "card";
  card.id=e.id;
  card.innerHTML = `
    <div class="carddiv">
        <p>${e.name}</p>
        <div class="icons">
            <i class="fa-regular fa-pen-to-square edit"></i>&nbsp;&nbsp;&nbsp;
            <i class="fa-solid fa-trash delete"></i>
        </div>
    </div>
    <span>Priority : <span id="priocolor">${e.priority}<span><span>
    <span id="carddate">${e.date}</span>
    `;
    card.addEventListener("blur",func)
    container.append(card);
        })
    }
}
function func(e)
{
    e.target.setAttribute("contenteditable", "false");

}
let priocount=0;
form.addEventListener("submit", (e) => {
  empty.style.display = "none";
  e.preventDefault();
  let obj={
    id:i,
    name:form.search.value,
    priority:form.prio.value,
    date:form.date.value
  }
  global.push(obj);
  addcard(form.search.value, form.date.value,form.prio.value);
  form.reset();
  
});
addtask.addEventListener("click",(e)=>{
    if(e.target.classList[2]=="delete")
    {
        let id=Number(e.target.parentNode.parentNode.parentNode.id)
        let element=e.target.parentNode.parentNode.parentNode.parentNode.children;
        global.splice(id-1,1);
        // console.log(id);
        // console.log(global);
        // console.log(priocount);
        if(element[id-1].children[1].children[0].innerText[0]=="H")
        {
            priocount--;
            todoright.forEach((e)=>{
                e.innerText=priocount;
            })
        }
        element[id-1].remove();
        
        
        i--;
        
        todoleft.forEach((e)=>{
            e.innerText=i-1;
        });
    }
    if(e.target.classList[2]=="edit")
    {
        // console.log(e.target.parentNode.parentNode.parentNode.set);
        e.target.parentNode.parentNode.parentNode.setAttribute("contenteditable", "true");
    }
    if(i==1)
    {
        empty.style.display="block";
        empty.style.display="flex";
    }
})
function addcard(name, date,priovalue) {
  let card = document.createElement("div");
  card.className = "card";
  card.id=i;
  card.innerHTML = `
    <div class="carddiv">
        <p>${name}</p>
        <div class="icons">
            <i class="fa-regular fa-pen-to-square edit"></i>&nbsp;&nbsp;&nbsp;
            <i class="fa-solid fa-trash delete"></i>
        </div>
    </div>
    <span>Priority : <span id="priocolor">${priovalue}<span><span>
    <span id="carddate">${date}</span>
    `;
    card.addEventListener("blur",func)
    container.append(card);
    todoleft.forEach((e)=>{
        e.innerText=i;
    })
    if(priovalue=="High")
    {
        ++priocount;
        todoright.forEach((e)=>{
            e.innerText=priocount;
        })
        
    }
    
    i++;
    // console.log(global);
    
}
