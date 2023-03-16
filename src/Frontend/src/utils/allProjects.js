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
            response.data.forEach((project) => {
                projects.push(project);
            });
        });
        
    }