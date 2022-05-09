pipeline {
  agent any
  stages {
    stage('Checkout Scm') {
      steps {
        git(credentialsId: 'github/jciarka', url: 'https://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@github.com/jciarka/PIS-2022L-KAFKA-PROD-FRONT.git')
      }
    }

    stage('Build project') {
      steps {
          sh '''# Build project
npm i
'''
      }
    }

    stage('Build docker') {
      steps {
        withCredentials([usernamePassword(usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PWD', credentialsId: 'DOCKER_REPO')]) {
          sh '''# Build docker image
# tag with current version and with latest
# push to docker repository

docker login -u $DOCKER_USER -p $DOCKER_PWD

PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: \'{ print $2 }\'| sed \'s/[",]//g\' | sed \'s/ //\')

docker build -t pis-kafka-prod-front:$PACKAGE_VERSION .

docker tag pis-kafka-prod-front:$PACKAGE_VERSION jciarka/pis-kafka-prod-front:$PACKAGE_VERSION
docker push jciarka/pis-kafka-prod-front:$PACKAGE_VERSION

docker tag pis-kafka-prod-front:$PACKAGE_VERSION jciarka/pis-kafka-prod-front:latest
docker push jciarka/pis-kafka-prod-front:latest
'''
        }
      }
    }

    stage('Clean docker') {
      steps {
        sh '''# Cleanup local images repository
docker rmi -f $(docker images -q jciarka/pis-kafka-prod-front) || true'''
      }
    }

    stage('Notify') {
      steps {
        emailext body: '''
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href=https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css>
    
  </head>
  <body>
  
  <div class="container m-4 jusutify-content-center">
  
  	<div class="card" style="width: 40rem;">
	  <div class="card-body">
		  <h2>Projekt PIS</h2></br>
	  
		  <h4>$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS</h4></br>
		  
		  <h6>Dostępne akcje:</h6>
		  
		  <a href="http://localhost:8888/job/docker%20ci-cd%20pis-frontend-jenkinsfile/"> 
		  	<button type="button" class="btn btn-warning">Jenkins project site</button>
	  	  </a>
		  <a href="https://github.com/jciarka/PIS-2022L-KAFKA-PROD-FRONT/"> 
		  	<button type="button" class="btn btn-warning">Github project site</button>
      </a>
		  <a href="http://localhost:8888/job/docker%20deployment%20pis-frontend-jenkinsfile/build?token=frontend" > 
		  	<button type="button" class="btn btn-primary">Deploy appliation</button>
      </a> 
	  </div>
	</div>
  </div>
  </body>
</html>        
        ''', 
        subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', 
        to: '01104656@pw.edu.pl'
      }
    }

  }
  triggers {
    pollSCM('* * * * *')
  }
}