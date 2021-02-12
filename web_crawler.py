import urllib.request
import sys
import time
from bs4 import BeautifulSoup
import requests
import re
import random
from time import time, sleep
from datetime import datetime
import mysql.connector
from flask import jsonify


url = 'https://www.day.az/'


def get_links():
    try:
        page = requests.get(url)
        soup = BeautifulSoup(page.text, "html.parser")
        # get main news divs on day.az
        divs = soup.find_all('div', attrs={'class': 'related-article'})
        # storage for links
        link_arr = []
        # get links for the articles
        for div in divs:
            links = div.find_all("a")
            for a in links:
                if "instagram" in a["href"]:
                    continue
                else:
                    link_arr.append(a["href"])
        return link_arr
    except Exception as e:
        error_type, error_obj, error_info = sys.exc_info()
        print('ERROR FOR LINK:', url)
        print(error_type, 'Line:', error_info.tb_lineno)




def get_data():
    # get links from previous function
    links = get_links()
    # create a data list
    data_list = []
    # create dynamic current url
    currUrl = ""
    # create an id var
    index = 0
    # # create an article class

    # class Article:
    #     def __init__(self, article_title, article_picture, article_link, article_content):
    #         self.article_title = article_title
    #         self.article_picture = article_picture
    #         self.article_link = article_link
    #         self.article_content = article_content

    #     def return_data_node(self):
    #         return {"title": self.article_title, "picture": self.article_picture, "link": self.article_link, "content": self.article_content}

    # create a random index function
    def ranIndex():
        indexArr = []
        i = random.randint(100000, 9999999)
        status = False
        while status != True:
            if i not in indexArr:
                indexArr.append(i)
                status = True
                return i
            else: 
                continue
        
        
    
    # loop through link arr and collect data
    for link in links:
        try:
            #articel text storage
            article_text = ""

            #store the current url
            currUrl = link

            #get the url
            page = requests.get(currUrl)
            soup = BeautifulSoup(page.text, "html.parser")

            # get article text
            articleTextSoup = soup.find("div", attrs={"class": "article-body"}).find_all("p")
            # make text presentable
            for element in articleTextSoup: article_text += '\n' + ''.join(element.findAll(text=True))
            # get article image
            articleImageSoup = soup.find("img", attrs={"class": "article-image"})
            image = articleImageSoup["src"]
            #get article title
            articleTitleSoup = soup.find("h1", attrs={"class":"article-title"})
            title = articleTitleSoup.text.strip()

            #random index storage
            index = ranIndex()

            #append data to data list
            data_list.append([title, image, currUrl, article_text])
            #print(data_list)
        except Exception as e:
            continue
    return data_list


# connecting to our news database
db = mysql.connector.connect(
    host="db4free.net",
    user="malikovy_admin",
    password="b3fc6f72",
    database="malikovy_news"
)

mycursor = db.cursor()

#mysql help queries
#////////
# mycursor.execute("CREATE TABLE Article (article_title MEDIUMTEXT, article_image MEDIUMTEXT, article_id int PRIMARY KEY AUTO_INCREMENT, article_text LONGTEXT)")
# mycursor.execute("DROP TABLE ArticleTest")
#////////

def update_db():
    # store data return
    data = get_data()
    print(data)

    print(f"\nINITIAL DATA REFRESH AT{datetime.now()}\n"*3)
    # delete old data
    mycursor.execute("DELETE FROM Article")
    db.commit()
    for res in data:
        # destructure the web crawler data
        title, image, id_num, text = res
        # insert new data
        mycursor.execute("INSERT INTO Article (article_title, article_image, article_text) VALUES (%s, %s, %s)", (title, image, text))
        db.commit()


def select_from_db():
    mycursor.execute("SELECT * FROM Article")
    
    container = []
    for x in mycursor:
        title, image, id_num, text = x
        container.append({"article_title": title, "articel_image": image, "article_text": text})
    return container
