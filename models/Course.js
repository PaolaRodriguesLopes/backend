var knex = require("../database/connection");
var bcrypt = require("bcrypt");


class Course{

    async findAll(){
        try{
            var result = await knex.select(["id","description","duration"]).table("courses");
            return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select(["id","description","duration"]).where({id:id}).table("courses");
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    

    async new(description,duration){
        try{
            await knex.insert({description,duration}).table("courses");
        }catch(err){
            return {status: false,err: err}
        }
    }       

    async update(id,description,duration){

        var course = await this.findById(id);

        if(course != undefined){

            var editCourse = {};

           
            if(description != undefined){
                editCourse.description = description;
            }

            if(duration != undefined){
                editCourse.duration = duration;
            }

            try{
                await knex.update(editCourse).where({id: id}).table("courses");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
            
        }else{
            return {status: false,err: "O curso não existe!"}
        }
    }

    async delete(id){
        var course = await this.findById(id);
        if(course != undefined){

            try{
                await knex.delete().where({id: id}).table("courses");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        
        }else{
            return {status: false,err: "O curso não existe, portanto não pode ser deletado."}
        }
    }
    
}

module.exports = new Course();