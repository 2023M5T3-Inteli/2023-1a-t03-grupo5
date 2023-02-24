import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Unit test for the "get all projects" endpoint function
  it("Should return all the projects", () => {
    var projects = ["Projeto Python", "Projeto Java", "Projeto Javascript"]
    expect(service.getProjects().length).toBe(projects.length)
  });

  // Unit test for the "create new project" endpoint function
  it ("Should create new project", () => {
    let projectCreated = {
      name: "Desenvolvimento de aplicação",
      start: "10/10/2023",
      end: "10/11/2023",
      description: "Desenvolvimento de aplicação para notebooks dell",
      ownerId: 20,
      coleaderId: 56,
      projectType: "Dev",
      blockedSubscriptions: true
    }
    expect(service.createProject("Desenvolvimento de aplicação", "10/10/2023", "10/11/2023", "Desenvolvimento de aplicação para notebooks dell", 20, 56, "Dev", true)).toBe(projectCreated)
  })

  // Unit test for the "delete project" endpoint function
  it("Should delete project", () => {
        const projectIdToDelete = 1;
        const beforeDelete = service.getProjects();
        service.deleteProject(projectIdToDelete);
        const afterDelete = service.getProjects();
        expect(afterDelete.length).toBe(beforeDelete.length - 1);
        expect(afterDelete.some(project => project.id === projectIdToDelete)).toBe(false);
    });
  
  // Unit test for the "edit already created project" endpoint function
  it('Should edit a project', () => {
    let newProjectData = {
      name: "Desenvolvimento de aplicação",
      start: "10/10/2023",
      end: "10/11/2023",
      description: "Desenvolvimento de aplicação para notebooks dell",
      ownerId: 20,
      coleaderId: 56,
      projectType: "Dev",
      blockedSubscriptions: true
    }
    expect(service.editProject(1, newProjectData)).toEqual({
      id: 1,
      name: "Desenvolvimento de aplicação",
      start: "10/10/2023",
      end: "10/11/2023",
      description: "Desenvolvimento de aplicação para notebooks dell",
      ownerId: 20,
      coleaderId: 56,
      projectType: "Dev",
      blockedSubscriptions: true
    })
  })

  // Unit test for the "edit already created specific project" endpoint function
  it('Should edit a specifc project information', () => {
    let newProjectData = {
      blockedSubscriptions: false
    }
    expect(service.editProject(1, newProjectData)).toEqual({
      id: 1,
      name: "Desenvolvimento de aplicação",
      start: "10/10/2023",
      end: "10/11/2023",
      description: "Desenvolvimento de aplicação para notebooks dell",
      ownerId: 20,
      coleaderId: 56,
      projectType: "Dev",
      blockedSubscriptions: false
    })
  })

  // Unit test for the "approving a project" endpoint function
  it('Should approve a project', () => {
    let newApproveData = {
      projectId: 23,
      ownerId: 20,
      approve: true
    }
    expect(service.approveProject(newApproveData)).toEqual({
      projectId: 23,
      ownerId: 20,
      approve: true
    })
  })

  // Unit test for the "get project by ID" endpoint function
  it('Should return a project by its ID', () => {
    const projectId = 1;

    const projectToReturn = {
        id: projectId,
        name: 'Desenvolvimento de aplicação',
        start: '2022-01-01',
        end: '2022-12-31',
        description: 'Desenvolvimento de aplicação para notebooks dell',
        ownerId: 1,
        coleaderId: 2,
        projectType: 'Dev',
        blockedSubscriptions: false,
    };

    expect(service.getProject(projectId)).toBe(projectToReturn)
  });

  // Unit test for the "apply project vacancy" endpoint function
  it('Should apply for a project vacancy', () => {
    let apply = {
      applicantId: 1,
      projectId: 2,
      roleId: 4,
      why: "Eu desejo para aprimorar minhas habilidade",
      habilities: "programaçao"
    }

    expect(service.applyProject(apply)).toEqual("Aplicação feita com sucesso!")
  })

  //Unit test for the "get specific apply" endpoint function
  it('Should get a specific apply', () => {
    expect(service.getApply(1)).toEqual({
      id: 1,
      applicantId: 1,
      projectId: 2,
      roleId: 4,
      why: "Eu desejo para aprimorar minhas habilidade",
      habilities: "Programaçao"
    })
  })

  // Unit test for the "get all applies" endpoint function
  it('Should all applies', () => {
    expect(service.getAllApplies()).toEqual([
      {
        id: 1,
        applicantId: 1,
        projectId: 2,
        roleId: 4,
        why: "Eu desejo para aprimorar minhas habilidade",
        habilities: "programaçao"
      },
      {
        id: 2,
        applicantId: 3,
        projectId: 6,
        roleId: 5,
        why: "Eu desejo aprender mais sobre programação",
        habilities: "UX"
      }
    ])
  })
