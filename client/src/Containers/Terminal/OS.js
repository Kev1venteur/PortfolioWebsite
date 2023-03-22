import React from 'react'

import default_files from '../../Resources/constants/default_files.json'

const initializeLocalStorage = () =>{
    let tree = localStorage.getItem('kevin-gillet-files');
    if(tree !== null)
        return
    
    saveData(default_files)
}

const saveData = (tree) => {
    let stringFileStructure = JSON.stringify(tree)
    localStorage.setItem('kevin-gillet-files',stringFileStructure)
}

export default class OS extends React.Component{
    user = 'guest'
    tree
    currentDirectory

    terminalString = this.user + '@kevingillet.com:~$ '


    constructor(props){
        super(props)
        initializeLocalStorage();
        this.tree = JSON.parse(localStorage.getItem('kevin-gillet-files'))
        this.currentDirectory = this.tree
    }

    ls(){
        return this.currentDirectory
    }

    open(parameters){
        let index = this.currentDirectory.findIndex(el=>el.name === parameters)
        if(index >= 0)
            return this.currentDirectory[index].owner
        else
            return false
    }
    
    reset(){
        saveData(default_files)
        window.location.reload();
    }
}


