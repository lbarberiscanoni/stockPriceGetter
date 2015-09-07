from bottle import route, run, template
import json
from yahoo_finance import *

@route("/")
def index():
    return template("index.html")

@route('/get_historical/<stock>/<firstDay>/<lastDay>')
def dataCleaned(stock, firstDay, lastDay):
	try:
		information = Share(stock)
		result = information.get_historical(firstDay, lastDay)
		if result == None:
			return None
		closingFirstDay = str(result[0]['Close'])
		closingLastDay = str(result[-1]['Close'])
		resultJson = json.dumps({'close_first_day':closingFirstDay,'close_last_day':closingLastDay})
		return resultJson
	except:
		return None

run(host='localhost', port=8000, debug=True)


#http://localhost:8080/get_historical/YHOO/2014-04-25/2014-04-29
