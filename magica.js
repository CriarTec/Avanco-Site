const carrouselprod = document.querySelector(".carrouselprod")
const arrowBtns = document.querySelectorAll(".tudinhossel i")
const firstCardWidth = carrouselprod.querySelector(".card").offsetWidth
const carrouselprodChildrens = [...carrouselprod.children]

let isDragging = false, startX, startScrollLeft;

let cardPerView = Math.round(carrouselprod.offsetWidth / firstCardWidth)

carrouselprodChildrens.slice(-cardPerView).reverse().forEach(card =>
{
    carrouselprod.insertAdjacentHTML("afterbegin", card.outerHTML)
})

carrouselprodChildrens.slice(0, cardPerView).forEach(card =>
    {
        carrouselprod.insertAdjacentHTML("beforeend", card.outerHTML)
    })

arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () => {
        carrouselprod.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    })
})

const dragStart = (e) =>
{
    isDragging = true;
    carrouselprod.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carrouselprod.scrollLeft;
}

const dragging = (e) => 
{
    if(!isDragging) return
    carrouselprod.scrollLeft = startScrollLeft - (e.pageX - startX);
    
}

const dragStop = () =>
{
    isDragging = false
    carrouselprod.classList.remove("dragging")
}
//40 ao infinito
const infiniteScroll = () =>
{
    
    if(carrouselprod.scrollLeft < 41) {
        carrouselprod.classList.add("no-transition")
        carrouselprod.scrollLeft = carrouselprod.scrollWidth - ( 2 * carrouselprod.offsetWidth)
        carrouselprod.classList.remove("no-transition")
    } 
    else if (Math.ceil(carrouselprod.scrollLeft) === carrouselprod.scrollWidth - carrouselprod.offsetWidth){
        carrouselprod.classList.add("no-transition")
        carrouselprod.scrollLeft = carrouselprod.offsetWidth
        carrouselprod.classList.remove("no-transition")
    }
}
carrouselprod.addEventListener("mousedown", dragStart)
carrouselprod.addEventListener("mousemove", dragging)
document.addEventListener("mouseup", dragStop)
carrouselprod.addEventListener("scroll", infiniteScroll)
