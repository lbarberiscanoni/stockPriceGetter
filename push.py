import time
import selenium 
from selenium import webdriver

browser = webdriver.Firefox()
browser.get("localhost:8000")

time.sleep(5)

buttons = browser.find_elements_by_id("stock")
print str(len(buttons)) + " stocks to analyze"
i = 0
for button in buttons:
    button.click()
    i += 1
    print str(i) + "/" + str(len(buttons)) + " done"
browser.close()
