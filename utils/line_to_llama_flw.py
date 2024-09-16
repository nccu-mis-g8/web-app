from os import listdir
import os
from os.path import isfile, join
import csv


# 自己的LINE帳號名稱
# master = "陳奕利Jefferson Chen"
# 放LINE聊天記錄txt檔的目錄

#可能會要有User name，現在暫時用User的line名子
class LineChatProcessor:
    def __init__(self, data_dir="./", master_name="祐辰"):
        self.data_dir = data_dir
        self.master_name = master_name
        self.output_file_name = f"{master_name}_training_data_flw.csv"
        self.instructions_list = []
        self.inputs_list = []
        self.outputs_list = []

    def is_master(self, name):
        return self.master_name in name
    
    def create_formatted_content(self, file_name):
        instruction = ""
        input = ""
        output = ""
        lines = None
        with open(file_name, encoding="utf-8") as f:
            lines = f.readlines()
        if lines is None:
            return
        pre_is_master = False

        for i in range(4, len(lines)):
            if (lines[i]) == "\n":
                continue
            if lines[i].endswith("已收回訊息"):
                continue
            w = lines[i].split("\t")
            if len(w) < 3:
                continue
            if "收回訊息" in w[2]:
                continue
            if self.is_master(w[1]):
                output += w[2]
                pre_is_master = True
            else:
                if pre_is_master:
                    self.instructions_list.append(instruction)
                    self.inputs_list.append(input)
                    self.outputs_list.append(output)
                    instruction = ""
                    input = ""
                    output = ""
                instruction += w[2]
                pre_is_master = False

    def output_file(self):
        if (
            len(self.instructions_list) != len(self.inputs_list)
            or len(self.inputs_list) != len(self.outputs_list)
            or len(self.instructions_list) != len(self.outputs_list)
        ):
            return
        block_title = "=你是好友，也是大學同學。請以好友的回氣回答對話。"
        with open(self.output_file_name, "w", encoding="utf-8") as writer:
            fieldnames = ["instruction", "input", "output", "text"]
            writer = csv.DictWriter(writer, fieldnames=fieldnames)
            writer.writeheader()
            for i in range(len(self.instructions_list)):
                writer.writerow(
                    {
                        "instruction": self.instructions_list[i],
                        "input": "",
                        "output": self.outputs_list[i],
                        "text": block_title,
                    }
                )
        
    def process(self):
        files = [
            f
            for f in listdir(self.data_dir)
            if isfile(join(self.data_dir, f)) and f.endswith("的聊天.txt")
        ]
        for f in files:
            self.create_formatted_content(f)
        self.output_file()
        print("done...")
        print(f"total length: {len(self.instructions_list)}")
        file_size = os.path.getsize(self.output_file_name)
        print(f"data size: {file_size/1024**2}mb")

