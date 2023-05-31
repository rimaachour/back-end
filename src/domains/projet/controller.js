const Project = require('./model')


const  addProject = async(req,res,next) =>{
    const {projectName,startDate,finDate,projectStatus}=req.body
    try {
        if (req.local.type != 'student') {
          throw new Error('You are not authorized to add skills');
        }
    
    const newproject= await Project.create({
        projectName:projectName,
        startDate:startDate,
        finDate:finDate,
        projectStatus:projectStatus,
        studentId:req.local.id
    
    
    });
    res.status(200).send(newproject);
    }catch (err) {
        next(err);
      }
    };



    const deleteProject = async (req, res, next) => {
        const  projectId = req.params.id;
        try {
          if (req.local.type !== 'student') {
            throw new Error('You are not authorized to delete projects');
          }
      
          const deleteProject = await Project.destroy({
            where: {
              id: projectId,
              studentId: req.local.id,
            },
          });
      
          if (deleteProject === 0) {
            throw new Error('Project not found or you are not authorized to delete');
          }
      
          res.status(200).send('Project deleted successfully');
        } catch (err) {
          next(err);
        }
      };
      
      const updateProject = async (req, res, next) => {
        const projectId = req.params.id;
        const {projectName,startDate,finDate,projectStatus}=req.body
           try {
          if (req.local.type !== 'student') {
            throw new Error('You are not authorized to update experiences');
          }
      
          const updatedProject = await Project.update(
            {
                projectName:projectName,
                startDate:startDate,
                finDate:finDate,
                projectStatus:projectStatus,
               
            
            },
            {
              where: {
                id: projectId,
                studentId: req.local.id,
              },
            }
          );
      
          if (updatedProject[0] === 0) {
            throw new Error('project not found or you are not authorized to update');
          }
      
          res.status(200).send('project updated successfully');
        } catch (err) {
          next(err);
        }
      };
      const getProject = async (req, res, next) => {
     
        try {
          if (req.local.type !== 'student') {
            throw new Error('You are not authorized to get projects');
          }
      
          const project = await Project.findAll({
            where: {
              studentId: req.local.id,
            },
          });
      
          if (!project) {
            throw new Error('project not found or you are not authorized to access');
          }
      
          res.status(200).send(project);
        } catch (err) {
          next(err);
        }
      };




    module.exports = {addProject,
        deleteProject,
        getProject,
        updateProject
     }