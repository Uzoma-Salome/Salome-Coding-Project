document.addEventListener("DOMContentLoaded",function () 
{
    const menuButton =
document.getElementById("menu-button");
    const menuItems =
document.getElementById("menu-items");
  
menuButton.addEventListener("click",function () 
{ 
menuItems.classList.toggle("active");
});
});
