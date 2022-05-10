pipeline {
  agent any
  stages {
    stage('Checkout Scm') {
      steps {
        git(credentialsId: 'github/jciarka', url: 'https://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@github.com/jciarka/PIS-2022L-KAFKA-PROD-FRONT.git')
      }
    }

    stage('SonarQube analysis') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "./gradlew sonarqube"
        }
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
	<style>
	.card {
	  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	  padding: 10px;
	  transition: 0.3s;
	  display: flex;
	  flex-wrap: wrap;
	  align-content: center;
	  background-color: #f5f7fa;
	}
	
	div.a {
	  text-align: center;
	}

	.card:hover {
	  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
	}

	.container {
	  padding: 2px 16px;
	}

	body {
	  font-family: Helvetica, Arial, sans-serif;
	}

	a {
	  background-color: #1F7F4C; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; text-decoration: none; padding: 5px 10px; color: #ffffff; border-radius: 5px; display: inline-block; mso-padding-alt: 0;>
	}

	</style>
  </head>
  <body>
  
  <div class="container m-4 jusutify-content-center">
  
  	<div class="card" style="width: 40rem;">
	  <div class="card-body">
		  <h2>Project PIS</h2>
	  
		  <h4>$PROJECT_NAME - Build # $BUILD_NUMBER </br>
		  Has been released with status: $BUILD_STATUS</h4>
		  
		  <h4>Available actions:</h4>
		  
		  <a href="http://localhost:8888/job/docker%20ci-cd%20pis-frontend-jenkinsfile/"> 
		  	Jenkins project site
	  	  </a>
		  <a href="https://github.com/jciarka/PIS-2022L-KAFKA-PROD-FRONT/"> 
		  	Github project site
      </a>
		  <a href="http://localhost:8888/job/docker%20deployment%20pis-frontend-jenkinsfile/build?token=frontend" > 
		  	Deploy appliation
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
