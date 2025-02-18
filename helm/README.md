
### **Project Directory Structure**
```
helm/
├── app/
│   ├── Chart.yaml
│   ├── values.yaml                # Shared/default values
│   ├── local/
│   │   └── values.yaml            # Local environment-specific values
│   ├── prod/
│   │   └── values.yaml            # Production environment-specific values
│   ├── qa/
│   │   └── values.yaml            # QA environment-specific values
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── ingress.yaml
├── database/
│   ├── Chart.yaml
│   ├── values.yaml                # Shared/default values
│   ├── local/
│   │   └── values.yaml            # Local environment-specific values
│   ├── prod/
│   │   └── values.yaml            # Production environment-specific values
│   ├── qa/
│   │   └── values.yaml            # QA environment-specific values
│   ├── templates/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── pvc.yaml               # Persistent Volume Claim for the database
```

### Port Mapping Flow with Kind (Kubernetes in Docker)

#### Configuration Components

1. **Kubernetes Service (Previous config)**
   ```yaml
   service:
     type: NodePort
     port: 80
     targetPort: 5173
     nodePort: 30000
   ```

2. **Kind Configuration**
   ```yaml
   extraPortMappings:
     - containerPort: 30000
       hostPort: 30000
       protocol: TCP
   ```

### Complete Traffic Flow

```text
Host Machine (localhost:30000)
        ↓ [Kind extraPortMappings]
Docker Container (containerPort:30000)
        ↓ [Kubernetes NodePort Service]
Kubernetes Service (port:80)
        ↓
Pod (targetPort:5173)
```

### Detailed Explanation

1. **Host Level (Your Machine)**
    - You can access the service through `localhost:30000`
    - The `hostPort: 30000` in kind-config.yaml exposes this port on your host machine

2. **Kind/Docker Level**
    - `extraPortMappings` creates a port mapping between your host machine and the Kind cluster's Docker container
    - `containerPort: 30000` matches the `nodePort: 30000` in the Kubernetes service
    - `protocol: TCP` specifies the network protocol to use

3. **Kubernetes Level**
    - The NodePort service picks up traffic from port 30000
    - Routes it to the internal service port 80
    - Finally delivers to the pod's container on port 5173

### Why This Configuration is Needed

- Kind runs Kubernetes inside Docker containers
- Without `extraPortMappings`, the NodePort service would only be accessible inside the Docker container
- This configuration creates the necessary bridge between:
    - Your host machine
    - The Kind Docker container
    - The Kubernetes cluster running inside Kind
    - The actual application pod

This setup is particularly useful for development environments where you need to access your services from your local machine while running them in a Kind cluster.