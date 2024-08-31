import os
from flask import Blueprint, render_template, request, redirect, url_for, send_from_directory, current_app
from werkzeug.utils import secure_filename
import line_to_llama_flw 

ALLOWED_EXTENSIONS = set(['txt', 'csv'])

upload_bp = Blueprint('upload', __name__)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # 檢查上傳目錄是否存在，不存在則創建
        upload_folder = current_app.config['UPLOAD_FOLDER']
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)
            
        file = request.files.get('file')  # 使用 .get() 以防沒有文件被上傳
        if not file:
            return render_template('upload.html', error="No file selected")

        if not allowed_file(file.filename):
            return render_template('upload.html', error="File type not allowed")

        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))

        processor = line_to_llama_flw.LineChatProcessor()
        processor.process()
        
        return redirect(url_for('upload.uploaded_file', filename=filename))

    return render_template('upload.html')

@upload_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)