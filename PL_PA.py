import selenium

from selenium import webdriver  # Import from seleniumwire
from ast import literal_eval
import json
#from selenium.webdriver.chrome.options import Options
driver=''
req=[]


recordJs=open("recordJS2.js").read()

ext_tuple=('.mp3', '.avi','.js','.css','.less','.scss','.png','.ico','.txt','.ini','.jpg','.mp4','xls','.doc','xlsx','.ppt','.pptx','.docx','.json','.java','.as','.mx','.asp','.ts','.jsp','.svg','.php','.xml','.xaml',
          '.yml' ,'.woff2','.jpeg')

def stop():
    global driver
    JS='''



document.body.addEventListener('mouseover', MouseInListenerFunction,true);
    


    function MouseInListenerFunction(event){
       event.target.style.border = '';
        
        }
        


    '''
    driver.execute_script(JS)

    return "STOPPED"

def initiate_driver(url):
    global driver
    #options = webdriver.ChromeOptions()
    #options.add_experimental_option('debuggerAddress', 'localhost:9014')
    driver = webdriver.Chrome(executable_path ="chromedriver.exe")
    driver.get(url)
def locate(xpath):

    global driver
    try:
        element=driver.find_element_by_xpath(xpath)
        driver.execute_script("arguments[0].style.border = '0.4em solid yellow';",element)
        return "PASS"
    except:
        return "FAIL"
def Q_recorder():

    global driver
    global recordJs
    Xpath=None
    data={}
    try:
        Xpath=driver.execute_script(recordJs)
    except:
        driver.switch_to_window(driver.window_handles[-1])
        
    return Xpath,data
def main():
    global driver
    
        
    #driver.switch_to.window()
    JS=open('get_ALL2.js').read()
    event_attributes=open('event_attributes.txt').read().split(", ")
    
    driver.switch_to_window(driver.window_handles[-1])
    A=driver.execute_script(JS,event_attributes)
      
    #JS11=open('smart_xpath.js').read()
    #driver.execute_script(JS11)
    #print(A)
    return A
def pageLocatorCreation(name,xpath):
    
    i = 0 
    L = "import org.openqa.selenium.WebElement;\n" 
    L+="import org.openqa.selenium.support.FindBy;\n"
    L+="import org.openqa.selenium.support.PageFactory;\n\n"
    L+="public class PageLocators {\n"
    length = len(name)
    while i < length:
        variableName=name[i].replace(' ','_')
        L+="\t@FindBy(xpath=\""+ xpath[i] + "\")\n"
        L+="\tpublic WebElement " + variableName + ";\n\n"
        i = i + 1
    L+="\tpublic PageLocators()\n\t{\n"
    L+="\tPageFactory.initElements(/*Please specify driver*/,this);\n\t}\n}"
    print(L)
    return L
def pageActionCreation(tag,name,xpath):
    objName="obj_PageLocators"
    L="import PageLocators.PageLocators;\n\n\n"
    L+="public class PageActions {\n\n"
    L+="\tPageLocators"+" "+objName+" =new PageLocators();\n\n"
    print(tag)
    for t in range(0,len(tag)):
        print(t,tag[t])
        
        if(tag[t]=="INPUT"or tag[t]=="TEXTAREA"):
            L+="\tpublic void method_"+name[t]+"(String data) throws InterruptedException(){\n"
            L+="\t\t"+objName+"."+name[t]+".sendKeys(data);\n"
            L+="\t}\n\n"
        elif(tag[t]=="SELECT"):
            L+="\tpublic void method_"+name[t]+"(value) throws InterruptedException(){\n"
            L+="\t\tSelect dropdown= new Select("+objName+"."+name[t]+");\n"
            L+="\t\tdropdown.selectByVisibleText(value);\n"
            L+="\t}\n\n"
        
            
        elif(tag[t]=="BUTTON" or tag[t]=="RADIO" or tag[t]=="CHECKBOX" or tag[t]=="A" ):

            L+="\tpublic void method_"+name[t]+"() throws InterruptedException(){\n"
            L+="\t\t"+objName+"."+name[t]+".click();\n"
        
            L+="\t}\n\n"
        else:
            L+="\tpublic void method_"+name[t]+"() throws InterruptedException(){\n"
            L+="\t\t"+objName+"."+name[t]+".getText();\n"
            L+="\t}\n\n"
        
    L+="}"
    return L


    
        

    
    
        
    
