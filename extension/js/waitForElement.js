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