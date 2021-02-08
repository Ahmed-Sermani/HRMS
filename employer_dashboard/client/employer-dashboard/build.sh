rm -rf ../../static/employer_dashboard/* &&
rm -rf ../../templates/* &&
rm -rf ./build &&
npm run build &&
mv ./build/* ../../static/employer_dashboard &&
mv ../../static/employer_dashboard/index.html ../../templates/index.html
sed  's,static,static/employer_dashboard/static,g' ../../templates/index.html | tee ../../templates/index.html &&
sed 's,manifest.json,static/employer_dashboard/manifest.json,g' ../../templates/index.html | tee ../../templates/index.html &&
sed 's,employee_dashboard_icon.png,static/employee_dashboard/employee_dashboard_icon.png,g' ../../templates/index.html | tee ../../templates/index.html