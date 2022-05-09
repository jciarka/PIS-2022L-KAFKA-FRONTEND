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
        emailext body: '''$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:
        Check console output at $BUILD_URL to view the results.
        
        <>
        ''', 
        subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!', 
        to: 'jakub.ciarka.stud@pw.edu.pl'
      }
    }

  }
  triggers {
    pollSCM('* * * * *')
  }
}