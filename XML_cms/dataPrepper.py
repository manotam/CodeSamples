
import os
# from pr_tailwind.settings import BASE_DIR
# from pr_tailwind.settings import STATIC_URL
from decoder import *
from XmlHelper import *

decoderVars = DecoderVars()

class DataPrepper:
    
    def __init__(self, linkToSource: str):
        self.linkToSource = linkToSource
        # self.path = os.path.join(BASE_DIR, STATIC_URL + linkToSource+"/")
        self.path = os.path.join(os.path.dirname(os.path.abspath(__file__)), linkToSource)


        self.xmlHelper = XmlHelper()
        self.allProjectsDict = {}
        self.allProjectInstances =[]

        self.allPagesList = os.listdir(self.path)

        for project in self.allPagesList:
            tempDict = self.collectPageFiles(
                project, 
                self.path
                )
            self.appendToProjectDict(tempDict, project)


    def appendToProjectDict(self, tempDict, project):
        projectInstance = Project(tempDict)
        self.allProjectsDict[project] = tempDict
        self.allProjectInstances.append(projectInstance)

        
    def collectPageFiles(self,project, baseLink: str):
            """
            reads in the files in the directory and creates a dict which contains the name strings

            """
            
            tempDict = {}
            tempDict["baseLink"]= baseLink


            # get all files in folder
            allFileLinks = os.listdir(os.path.join(baseLink, project))


            tempDict["media"] = []    
            picEndings = ["PNG","png","jpg","JPG","jpeg","JPEG", "GIF", "gif"]
            pdfEndings = ["pdf", "PDF", "Pdf"]
            
            for fileName in allFileLinks:
                fileNameSplit = fileName.split('.')
                fileEnding = fileNameSplit[len(fileNameSplit)-1]

                if any(picsEnding in fileEnding for picsEnding in picEndings):
                    tempDict["media"].append(fileName)
                    if fileNameSplit[0] == "cover":
                        tempDict["coverPic"] = os.path.join(baseLink, fileName)
 
                elif fileEnding == "xml":
                    tempDict["name"] = project
                    tempDict["url"] = baseLink
                    tempDict["content"] = self.getPageContent(os.path.join(baseLink, project, fileName))

            return tempDict

    def getPageContent(self, link):
        """
        get the page elements and return the dict with the content
        """

        dictToReturn = self.xmlHelper.unwrapXml(link)


        return dictToReturn


    def getAllPagesList(self):
        return self.allPagesList
    
    def getPageLink(self, pangeListName):
        pageListStrings = pangeListName.split()
        pageLink = "".join(pageListStrings)
        return pageLink

    def getAllProjectsListDict(self):
        return self.allProjectsDict
    
    def getAllProjectsList(self):
        tempList = []
        for projectDict in self.allProjectsDict:
            tempList.append(projectDict)
        return tempList
    
    def getProjectThroughUrl(self, url):
        for projectInstance in self.allProjectInstances:
            if projectInstance.url == url:
                return projectInstance
        else:
            return "notFound"

 
class Project:
   
    def __init__(self, projectDict):

        self.projectSectionList = []

        self.projectDict =  projectDict
        if 'name' in projectDict:
            self.name =         projectDict["name"]
            self.projectSectionList.append(self.name)
        
        if 'url' in projectDict:
            self.url =          projectDict["url"]
            self.projectSectionList.append(self.url)

        if 'title' in projectDict['content']:
            self.title =        projectDict['content']['title']
            self.projectSectionList.append(self.title)

        if 'work' in projectDict['content']:
            self.work =         projectDict['content']['work']
            self.projectSectionList.append(self.work)


        if 'project' in projectDict['content']:
            self.projectType =  projectDict['content']['project']
            self.projectSectionList.append(self.projectType)


        if 'skills' in projectDict['content']:
            self.skills =       projectDict['content']['skills']
            self.skillList = self.skills[decoderVars.para][0].split(", ")
            self.projectSectionList.append(self.skills)

        if 'project_link' in projectDict['content']:
            self.link =     projectDict['content']['project_link']
            self.projectSectionList.append(self.link) 

        if 'coverPic' in projectDict:
            self.coverPic =     projectDict['coverPic']

        # self.staticLinkToProject = projectDict["staticLinkToProject"] 

        self.mainContent = []
 
        for textBlock in projectDict['content'][decoderVars.typeText]:
            self.projectSectionList.append(textBlock)
            self.mainContent.append(textBlock)
 
 
        return
    
    def getProjectDict(self):
        return self.projectSectionList
    