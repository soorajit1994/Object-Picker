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

def initiate_driver():
    global driver
    #options = webdriver.ChromeOptions()
    #options.add_experimental_option('debuggerAddress', 'localhost:9014')
    driver = webdriver.Chrome(executable_path ="chromedriver.exe")
    #driver.get(url)

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
        


    
        

    
    
        
    
