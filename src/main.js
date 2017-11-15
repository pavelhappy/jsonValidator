function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var dt = ev.dataTransfer;
    if (dt.items) {
        for (i = 0; i < dt.items.length; i++) {
            if (dt.items[i].kind === "file") {
                var f = dt.items[i].getAsFile();
                readFile(f);
            }
        }
    }
}

document.getElementById('uploadJSONform').addEventListener('click', function () {
    uploadButton.click();
});

function loadFile(file) {
    var files = file.target.files;
    if (files) {
        for (var i = 0, f; f = files[i]; i++) {
            readFile(f);
        }
    }
}

document.getElementById('uploadButton').addEventListener('change', loadFile, false);


function readFile(f) {
    document.getElementById('err').classList.add('invisible');
    var r = new FileReader();
    r.onload = (function (f) {
        return function (e) {
            var contents = e.target.result;
            isJSONValid(contents);
        };
    })(f);
    r.readAsText(f);
}

function isJSONValid(fie) {
    try {
        var objectsCount = Object.keys(JSON.parse(fie)).length;
        document.getElementById('err').textContent = "JSON содержит " + objectsCount + " объектов";
        document.getElementById('err').classList.remove('err');
        document.getElementById('err').classList.remove('invisible');

    } catch (e) {
        document.getElementById('err').textContent = "Ошибка валидации JSON";
        document.getElementById('err').classList.add('err');
        document.getElementById('err').classList.remove('invisible');
    }
}