const configuration = {
    user: {
        skript_config: "https://playerservers.com/dashboard/filemanager/&action=edit&medit=/plugins/Skript/config.sk&dir=/plugins/Skript",
        skript_version: "auto",
        check_valid: true
    },
    system: {
        skript_tags: "https://api.github.com/repos/SkriptLang/Skript/tags",
        skript_language_files: "https://api.github.com/repos/SkriptLang/Skript/contents/src/main/resources/lang?ref={VERSION}",
        skript_language_content: "https://raw.githubusercontent.com/SkriptLang/Skript/{VERSION}/src/main/resources/lang/{LANGUAGE}.lang",
        skript_language_exclude: ["readme.txt"],
        skript_version_matcher: /version: (.*)\r\n# DO NOT CHANGE THIS VALUE MANUALLY!/,
        skript_version_rewrite: /^.+-(dev\d+)$/,
        skript_language_rewrite: /^(.*).lang$/,
        cubedcraft_list_files: "https://playerservers.com/queries/list_files/?dir={PATH}",
        cubedcraft_file_edit: "https://playerservers.com/dashboard/filemanager/&action=edit&medit={PATH}{FILE}&dir={PATH}",
        cubedcraft_file_new: "https://playerservers.com/dashboard/filemanager/?action=new&dir={PATH}",
        cubedcraft_token_pattern: [/<input type="hidden" name="token" value="([\d\w]+)">/, /token: "([\d\w]+)"/]
    }
};

(async () => {

    // detect skript version
    if (configuration.user.skript_version === "auto") {

        printLog("Detecting installed Skript version...");

        const html = await fetch(configuration.user.skript_config).then(response => response.text());
        const config_version = html.match(configuration.system.skript_version_matcher);

        if (!html || !config_version) {
            printLog("Failed to detect installed Skript version", true);
            return;
        }

        const version_rewrite = config_version[1].match(configuration.system.skript_version_rewrite);
        configuration.user.skript_version = (version_rewrite ? version_rewrite[1] : config_version[1]);
        printLog("Detected installed Skript version: " + configuration.user.skript_version + (version_rewrite ? " (" + config_version[1] + ")" : ""));

    }

    if (configuration.user.check_valid) {

        // verify skript version
        const tags = await fetch(configuration.system.skript_tags).then(response => response.json());
        const match_version = tags.find(loop_tag_object => loop_tag_object.name === configuration.user.skript_version);

        if (!match_version) {
            printLog("Version " + configuration.user.skript_version + " is not a valid version", true);
            return;
        }

        printLog("Version " + configuration.user.skript_version + " is a valid version");

    }

    // get all available language
    const language_files_url = insertPlaceholder(configuration.system.skript_language_files, {version: configuration.user.skript_version});
    const language_files = (await fetch(language_files_url).then(response => response.json())).filter(language_file => !configuration.system.skript_language_exclude.includes(language_file.name));
    const languages = language_files.map(loop_language_file => loop_language_file.name.match(configuration.system.skript_language_rewrite)[1]);

    printLog("Found avaiable language files: " + languages.join(", "));

    // upload language files
    for (let language_file_index = 0; language_file_index < language_files.length; language_file_index++) {

        const language = languages[language_file_index];
        const language_content_url = insertPlaceholder(configuration.system.skript_language_content, {version: configuration.user.skript_version, language: language});
        const language_content = await fetch(language_content_url).then(response => response.text());
        await uploadFile("/plugins/Skript/", "aliases-" + language, "sk", language_content);

        printLog("Uploaded language " + language + " to aliases-" + language + ".sk (" + (language_file_index + 1) + "/" + language_files.length + ")");

    }

    printLog("Successfully uploaded all avaiable language files!");

})();

async function getToken(url) {

    const html = await fetch(url).then(response => response.text());
    const token_match_pattern = configuration.system.cubedcraft_token_pattern.find(pattern => html.match(pattern) !== null);
    const token_matcher = html.match(token_match_pattern);

    return token_matcher ? token_matcher[1] : undefined;

}

async function uploadFile(folder_path, name, extension, content) {

    const upload_url = insertPlaceholder(configuration.system.cubedcraft_list_files, {path: folder_path});
    const exist_files = await fetch(upload_url).then(response => response.json());

    if (exist_files.files.find(loop_exist_file => loop_exist_file.filename === name + "." + extension)) {

        // file already exist
        
        const file_edit_url = insertPlaceholder(configuration.system.cubedcraft_file_edit, {path: folder_path, file: name + "." + extension});

        const new_parameters = new URLSearchParams();
        new_parameters.append("edit-file-name", name + "." + extension);
        new_parameters.append("edit-file-content", content);
        new_parameters.append("token", await getToken(file_edit_url));
        new_parameters.append("edit-file-sub", "Submit");

        await fetch(file_edit_url, {method: "POST", body: new_parameters});

    } else {

        // file not exist

        const file_new_url = insertPlaceholder(configuration.system.cubedcraft_file_new, {path: folder_path});

        const new_parameters = new URLSearchParams();
        new_parameters.append("edit-file-name", name);
        new_parameters.append("ext", extension);
        new_parameters.append("edit-file-content", content);
        new_parameters.append("token", await getToken(file_new_url));
        new_parameters.append("edit-file-sub", "Submit");

        await fetch(file_new_url, {method: "POST", body: new_parameters});

    }

}

function insertPlaceholder(text, placeholders) {

    return text.replace(/{\w+}/g, loop_placeholder => placeholders[loop_placeholder.slice(1, loop_placeholder.length - 1).toLowerCase()] || loop_placeholder);

}

function printLog(message, error) {

    console.log((error ? "[ERROR] " : "") + message);

}
