# Conversation Prompt Log

## 2026-04-26

### User

อยากทำเว็บ appilcation to do app ที่สามารถเปิดในมือถือได้ เอาเป็น local ออก netword ง่ายๆก็ได้นะ และอยากให้สร้าง floder for เก็บ prompts เป็น .md ที่เราคุยกันไว้ด้วย ทุกครั้งที่เราพิมพ์คุยให้ copy ไปเก็บไว้ในนั้นด้วย ใช้เป็น frontend ใช้เป็น vite react และ tailwind backend ใช้เป็น nestjs dbเป็น postgre อยากทำเป็น project ที่เป็น

| กลุ่ม | คำที่อยู่ในกลุ่มนี้ | แนวคิดหลัก |
| --- | --- | --- |
| **1. Code Quality / คุณภาพโค้ด** | Clean Code, Code Small, DRY, Long Method, Long Class, Refactor | ทำให้โค้ดอ่านง่าย แก้ง่าย ลดความซับซ้อน |
| **2. Design Principles / หลักการออกแบบโค้ด** | SOLID, YAGNI | ออกแบบโค้ดให้ยืดหยุ่น แต่ไม่ทำเกินจำเป็น |
| **3. Testing Practices / แนวทางการทดสอบ** | Automated Test, TDD, ATDD, BDD | ใช้ test ช่วยควบคุมคุณภาพและพฤติกรรมของระบบ |
| **4. App Architecture & Deployment / สถาปัตยกรรมและการ deploy** | 12 Factors | แนวทางทำแอปให้ deploy ง่าย scale ง่าย config ชัดเจน |
| **5. Security Testing / การทดสอบความปลอดภัย** | Pen Test | ทดสอบระบบเหมือนแฮกเกอร์ เพื่อหาช่องโหว่ |

### Assistant Notes

Created a local-first todo app scaffold with frontend, backend, PostgreSQL config, and this prompt log.

### User

ตอนนี้เหมือนจะเข้าใจผิดอยู่นะ to do app ที่อยากได้เป็น to do app ธรรมดา แต่ใช้หลักการ code craft ที่ให้ไปในการเขียน code

### Assistant Notes

Adjusted the app direction: the product should be a normal todo app, while code craft principles guide implementation quality rather than appearing as todo categories in the UI or database model.

### User

เขียน README.md ของทั้ง backend และ frontend ให้หน่อยค่ะ

### Assistant Notes

Added separate README files for backend and frontend with setup, scripts, environment variables, testing, build, and code structure notes.

### User

เขียน .gitignore ให้ project นี้ด้วยค่ะ

### Assistant Notes

Expanded the root `.gitignore` for the Node monorepo, including dependencies, build outputs, environment files, logs, caches, editor files, generated artifacts, and local runtime files.

### User

เขียน pipeline ให้หน่อย

### Assistant Notes

Added a GitHub Actions CI pipeline that installs dependencies with `npm ci`, tests backend and frontend workspaces, and builds the monorepo on push and pull request events.
