/*
 * Wait for an element to display and then fires a callback
 * use it: waitForElementToDisplay(...).then(cb);
 *              /!\ This is not a promise /!\
 */
function waitForElementToDisplay (selector, time) {

	var _elementThere = false;
	var _callback = null;

	function _setCallback (cb) {
		_callback = cb;
		_process();
	}

	function _setElementThere (bool) {
        console.log('Elelemt set')
		_elementThere = bool;
		_process();
	}

	function _watch (selector) {
            console.log('watch')
        if (document.querySelector(selector) != null) {
            console.log('FOUND')
            _setElementThere(true);
            return;
        }
        else {
            setTimeout(function() {
                _watch(selector, time);
            }, time);
        }
    }


    function _process () {
        console.log('process called', _elementThere, _callback)
    	if (!_elementThere || !_callback)
    		return ;

        console.log('process after')

    	_callback();
    }

    _watch(selector, time);
    
    return {
        then: _setCallback
    };

}

/*
 * Get/set cookies
 */
var setCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return null;
}

/*
 * HTTP Requests
 */
function httpGet(url) {
    var _xhttp = new XMLHttpRequest();

    var _res, _error, _thenCallback, _errorCallback;

    _xhttp.onreadystatechange = function() {
        if (_xhttp.readyState == 4) {
            if (_xhttp.status == 200) {
                _res = _xhttp.responseText;
                if (_thenCallback)
                    _thenCallback(_res);
            } else {
                _error = _xhttp;
                if (_errorCallback)
                    _errorCallback(_error);
            }
        }
    };
    _xhttp.open("GET", url, true);
    _xhttp.send();

    function _setThenCallback(cb) {
        _thenCallback = cb;

        if (_res)
            _thenCallback(_res);

        return this;
    }

    function _setErrorCallback(cb) {
        _errorCallback = cb;

        if (_error)
            _errorCallback(cb);

        return this;
    }

    return {
        then: _setThenCallback,
        error: _setErrorCallback
    };
}

function addEventsListener(el, s, fn) {
  var evts = s.split(' ');
  for (var i=0, iLen=evts.length; i<iLen; i++) {
    el.addEventListener(evts[i], fn, false);
  }
}