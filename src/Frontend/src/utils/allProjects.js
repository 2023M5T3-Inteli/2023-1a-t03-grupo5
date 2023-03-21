const { default: axios } = require("axios");
const { response } = require("express");

const PORT = 3000;
const HOST = 'localhost';
const API_URL = `http://${HOST}:${PORT}/`;

const getProjects = async () => {
    axios
        .get(`${API_URL}/home`)
        .then((response)=> {
            //create a new array with the data from the response
            const projects = [];
            //loop through the response and push the data to the array
            response.data.forEach((project) => {
                projects.push(project);
            });
        });

        document.getElementById("projects").innerHTML = "";

        //render the projects
        renderProjects();
    }

const renderProjects = (list) => {
    const table = document.getElementById("projects");

    list.length > 0 
    ? list.map((project) => {
        const {id, name} = project;
        table.innerHTML += `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <Link to={'/project/${id}'}>
            <button id="confirma-botao" onClick={() => {
            handleInput();
            }}>Projeto</button>
        </Link>
        </tr>
        `;
    })
    : table.innerHTML += `
    <tr>
        <td colspan="2">Nenhum projeto encontrado</td>
    </tr>
    `;
}


