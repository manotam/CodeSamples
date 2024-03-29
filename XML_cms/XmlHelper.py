import xml.etree.ElementTree as ET
from decoder import *
decoderVars = DecoderVars()

class XmlHelper:

    def __init__(self):
        return
    
    def unwrapXml(self, link):
        tree = ET.parse(link)
        root = tree.getroot()
        dictToReturn = {}
        # define before because it is a list
        dictToReturn[decoderVars.typeText] = []


        for child in root:
            # looping through the sections, empty tempDict each time 
            paraList = []
            classDict = {}
            tempDict = {}
            currentType =""
            descriptionList=[]

            for section in child:
                # looping through the tags in the sections and select if suitable

                if section.tag == decoderVars.title:
                    # lets get the classes list from the xml
                    classDict = self.decodeClasses(section.text)

                    # save class dict under decoderVars.classesDictName in temp dict
                    tempDict[decoderVars.classesDictName] = classDict

                    # get current typeName
                    currentType = classDict[decoderVars.contentTypeName]

                # filter out empty paragraphs

                elif section.text != None:
                    # take text and append
                    if section.tag == decoderVars.para:
                        paraList.append(section.text)
                    
                    # other filters to include 
                    elif section.tag == decoderVars.orderedlist:
                        allParas = []
                        for listEntry in section:
                            for para in listEntry:
                                allParas.append(para)

                        paraList.append([section.tag, allParas])
            
            tempDict[decoderVars.para] = paraList
            
            # save the whole section in the main dict based on the type
            if currentType != decoderVars.typeText:
                dictToReturn[currentType] = tempDict
            elif currentType == decoderVars.typeText:
                dictToReturn[currentType].append(tempDict)


        return dictToReturn


    def decodeClasses(self, fullString):
        tempDict = {}
        splitString = fullString.split(", ")

        for classInstance in splitString:
            classSplit = classInstance.split(":")
            tempDict[classSplit[0]]=classSplit[1]
        return tempDict
    
    def decodeListItems(self, listItem):
        return 