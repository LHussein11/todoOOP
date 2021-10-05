
class Todo {
    constructor(){
      this.input = document.querySelector('.input');
      this.btnAdd = document.querySelector('.btnInput');
      this.main = document.querySelector('main');
      this.btnDelete = document.querySelector('.btnDelete');
    }
    
    // Many things are rendered through this method
    renderItem(){
      
      this.btnAdd.addEventListener('click', ()=> {
      let inputItem = this.input.value;
      if(inputItem.trim() === ''){
        return false;
      }else {
        this.addItem(inputItem);
        this.addToStorage(inputItem);
        this.input.value = '';
      }
      })
      
    }
    
    addItem(input){
      let main = this.main;
      let item = `
        <div class="item">
          <p>${input}</p>
          <i class="fas fa-trash"></i>
        </div>
      `;
      
      main.innerHTML += item;
    }
    
    addToStorage(input){
      let itemStorage = JSON.parse(localStorage.getItem('items')) || [];
      itemStorage.push(input);
      
      localStorage.setItem('items', JSON.stringify(itemStorage));
    }

    displayFromStorage(){
        let present = localStorage.getItem('items');

        if(present){
            let itemsLocal = JSON.parse(localStorage.getItem("items"));

            itemsLocal.forEach(items => {
                this.addItem(items);
            })
        }
    }

    deleteSingleItem(item){
        let main = this.main
        let arrMain = Array.from(main.children);
        arrMain.forEach(mainChildrenEl => {
            mainChildrenEl.addEventListener('click', ()=> {
                mainChildrenEl.remove()

                // Radera från LS och datastrukturen
                let itemContent = mainChildrenEl.children[0].textContent;
                let itemToDelete = JSON.parse(localStorage.getItem("items"));
                let index = itemToDelete.indexOf(itemContent);

                itemToDelete.splice(index, 1);
                localStorage.removeItem("items");
                localStorage.setItem("items", JSON.stringify(itemToDelete));
            })
        })
    }

    deleteAllItems(){
        let deleteallItems = this.btnDelete;

        deleteallItems.addEventListener('click', () => {
            let arrChildren = Array.from(this.main.children);

            arrChildren.forEach(arrChildrenEl => {
                arrChildrenEl.remove();
                localStorage.removeItem("items");
            })
        })
    }
  }
  
  
  let todo = new Todo();
  todo.renderItem();
  todo.displayFromStorage();
  todo.deleteSingleItem();
  todo.deleteAllItems();