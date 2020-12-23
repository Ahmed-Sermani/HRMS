rm -rf ../../static/employee_dashboard/* &&
rm -rf ../../templates/* &&
rm -rf ./build &&
npm run build &&
mv ./build/* ../../static/employee_dashboard &&
mv ../../static/employee_dashboard/index.html ../../templates/index.html
sed  's,static,static/employee_dashboard/static,g' ../../templates/index.html | tee ../../templates/index.html &&
sed 's,manifest.json,static/employee_dashboard/manifest.json,g' ../../templates/index.html | tee ../../templates/index.html &&
sed 's,employee_dashboard_icon.png,static/employee_dashboard/employee_dashboard_icon.png,g' ../../templates/index.html | tee ../../templates/index.html