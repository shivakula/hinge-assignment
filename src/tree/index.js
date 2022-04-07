import React, { useState, useEffect } from "react";
import "./index.css";
import data1 from "./data.json";

export default function Tree() {
  const [data, setData] = useState(data1);
  useEffect(() => {
    populatedata();
    console.log(data);
  }, [data,populatedata]);
  const setDataUI = (event) => {
    console.log(event);
    
    console.log({
      id: data.length + 1,
      name: event.target.value,
      parentId: parseInt(event.target.name),
      className: "nested active",
    });
    document.getElementById("test").innerHTML="";

    setData([
      ...data,
      {
        id: data.length + 1,
        name: event.target.value,
        parentId:  parseInt(event.target.name),
        className: "nested active",
      },
    ]);
  };

  function populatedata() {
    const list = document.createElement("ul");

    list.setAttribute("id", "myUL");

    

    list.name = 1;
    data.forEach((folder) => {
      if (folder.parentId === -1) {
        var item = document.createElement("li");
        var span = document.createElement("span");
        var input = document.createElement("input");
        input.name = folder.id;
        span.innerText = folder.name;
        list.setAttribute("class", folder.className);
        span.setAttribute("class", "caret");
        item.appendChild(input);
        item.appendChild(span);
        input.addEventListener("keyup", function (e) {
          if (e.code === "Enter") setDataUI(e);
        });
        list.appendChild(item);
        var children = document.createElement("ul");
        item.appendChild(children);
        checkChild(folder.id, children);
      }
    });

    setTimeout(() => {
      document.getElementById("test").appendChild(list);
    }, 10);
  }

  function checkChild(parentid, parent) {
    data.forEach((folder) => {
      if (folder.parentId === parentid) {
        //  var item = $("<li>").html(folder.FolderName);
        var children = document.createElement("ul");
        var item = document.createElement("li");
        var span = document.createElement("span");
        var input = document.createElement("input");
        input.name = folder.id;
        item.name = folder.id;
        parent.setAttribute("class", folder.className);
        item.appendChild(input);
        span.innerText = folder.name;
        span.setAttribute("class", "caret");
        item.appendChild(span);
        parent.appendChild(item);
        item.appendChild(children);
        input.addEventListener("keyup", function (e) {
          if (e.code === "Enter") setDataUI(e);
        });
        //item.addEventListener("click", setDataUI, false);
        checkChild(folder.id, children);
      } else {
        return;
      }
    });
  }
  return (
    <>
      <div id="test"></div>
    </>
  );
}
