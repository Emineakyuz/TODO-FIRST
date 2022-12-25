import React, { useState } from "react";


function App() {
  const [todoText, setTodoText] = useState("") //todoText state in adıdır. setTodoText ise fonksiyondur. =useState ("") ise state in başlangıç durumunu verir burada boş bir string dir.
  const [todos, setTodos] = useState([]) //her yazılan todo ların liselenmesi için fonksiyon bu bir dizibir ve başlangıç değeri boş bir dizidir [] gibi//
  const [editButonunaBasildiMi, setEditButonunaBasildiMi]=useState(false)
  const [guncellenecekText, setGuncellenecekText]=useState("")
  const [guncellenecekTodo,setGuncellenecekTodo]=useState(null)
  const handleSubmit = (event) => {
    event.preventDefault() /* submitin default davranışı olarak başka bir yere yönlendirilmesini engelliyoruz*/
    /*validation*/
    if (todoText === "") {
      alert('Please type your todo!')
      return
    }
    console.log(todoText)
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false,
    }
    console.log(newTodo)
    setTodos([...todos, newTodo]) // inputa bir şey yazılıp add butonu tıklandığında tüm todoların inouta yazılı adlarıyla yazılmasını istiyoruz//
    setTodoText("") //bununla her yeni eleman listeye eklendikten sonra inputun textinden silinir//
  }
  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(i => i.id !== id) /* burada id si i olmayanları yeniden kullanmak üzere setTodos ları yeniden oluşturacağız aslında id si i olan yeni listede olmayacağı için silinmiş olacak */
    setTodos(filteredTodos)
  }
  const changeHasDone = (todo) => {
    /* 
    1. hangi todo nun done alanı tıklanırsa onu true ise false yap tersine çevir
    2. a. todos isimli state tek tek dolaşılır.
    b. güncellenmek istenen todo bulununca hasDone isimli alanını 1. maddedeki gibi değiştirmeliyim
    c. todos dizinini dolaşırken aranan todo dışında todo gelirse değiştirMEmeliyim.
    */

    console.log(todo)
    let tempTodos = [] /*aşağıdaki for döngüsünü map ile yaptık aslında aynı şey */
    todos.map((item)=>{
      if(item.id===todo.id){
        let updateTodo={
          ...todo, hasDone:!todo.hasDone
        }
        tempTodos.push(updateTodo)
      } else{
        tempTodos.push(item)
      }
    })
    /*
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === todo.id) {
        let updatedTodo = {
          ...todo, hasDone: !todo.hasDone  
        }
        tempTodos.push(updatedTodo)
      } else {
        tempTodos.push(todos[i])
      }
    } */
    setTodos(tempTodos)
  }
const todoGuncelle=(event)=>{
  event.preventDefault ()
  console.log(guncellenecekTodo)
  if(guncellenecekText===""){
    alert("TodoText can't be empty")
    return
  }
  let tempTodos=[]
  todos.map(item=>{
   if(item.id === guncellenecekTodo.id){
    let updatedTodo={
      ...guncellenecekTodo,
      title: guncellenecekText
    }
    tempTodos.push(updatedTodo)

   }else {
    tempTodos.push(item)
   }
  })
  setTodos(tempTodos)
  setEditButonunaBasildiMi(false)
}

/*yukarıda üç nokta done ı tıklanan todo nun tüm özelliklerini geç demek oluyor ve hasDone a geldiğinde ! işareti diyor ki eğer hasDone done ise undone yap değilse done yap.  */
  return ( //bu parantez jsx döngüsünün açıldığını ifade eder//
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input //inputu kontrol edebilmek için ona bir value vermeliyiz.//
            value={todoText} //inputun bir onchange i olmalı ve bunun içinde bir fonksiyon çalışmalı//
            onChange={(event) => { /* bu onchange js de addeventlistener fonksiyonuna karşılık gelir*/
              setTodoText(event.target.value) //bu şekilde input kontrol edilir.//
            }}
            type="text" //her input için farklı bir state yazılır// 
            className="form-control"
            placeholder="Type your todo"
          />
          <button className="btn btn-primary w-25"
            type="submit" >ADD
          </button>
        </div>
      </form>
      {
        editButonunaBasildiMi === true && (
<form onSubmit={todoGuncelle}>
        <div className="input-group mb-3">
<input 
value={guncellenecekText}
onChange={(event)=>setGuncellenecekText(event.target.value)}
className="form-control" type={"text"}
/>
<button onClick={()=>{
  setEditButonunaBasildiMi(false)
}}
className="btn btn-danger w-25" type="button">
Cancel
</button>
<button className="btn btn-info w-25" type="submit">
Save
</button>
        </div>
      </form>
        )
      }
      
      <div className="container">
        {
          todos.length === 0 ? (
            <p className="text-center"> You don't have any todos yet. </p>
          ) : ( //jsx döngüsünde js kodu yazmak için div gibi bir element açmamız gerekiyor ve içine süslü parantez açıp js kodu yazabiliyoruz// 
            <>
              { // <> şeklinde açılan ve </> olarak kapanan bu işaret div gibi çalışır geçici parent denilen bir fragmenttir//
                todos.map((item, index) => (
                  <div key={index}
                    style={{ borderBottom: "1px solid gray" }}
                    className="d-flex justify-content-between align-item-center">
                    <div>
                      <h1 style={{
                        textDecoration:
                          item.hasDone === true ? "line-through" : "none",
                      }}
                      >{item.title} {" "}
                      </h1>
                      <small>{new Date(item.date).toLocaleString()}
                      </small>
                    </div>
                    <div>
                      <button onClick={() => {
                        deleteTodo(item.id)

                      }}
                        className="btn btn-sm btn-danger">
                          Delete 
                          </button>
                      <button onClick={()=>{
                        setEditButonunaBasildiMi(true)
                        setGuncellenecekText(item.title)
                        setGuncellenecekTodo(item)
                      }}   className="btn btn-sm btn-secondary">Edit </button>
                      <button onClick={() => changeHasDone(item)}
                        className="btn btn-sm btn-success">
                        {item.hasDone === false ? "Done" : "Undone"} </button>
                    </div>

                  </div>
                ))
              } </>
          )
        }
      </div>
    </div>
  );
}

export default App;

